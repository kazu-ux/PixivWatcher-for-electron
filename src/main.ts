import path from 'node:path';
import { BrowserWindow, app, ipcMain, net } from 'electron';
import './database/ipc';

import { WorkData } from './web/types/type';

app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    width: 2000,
    height: 1000,
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    // urlsを扁壷する際はindex.htmlも確認する
    {
      urls: ['https://i.pximg.net/*', 'https://s.pximg.net/*'],
      types: ['image'],
    },
    (detail, cb) => {
      let { requestHeaders } = detail;
      requestHeaders = {
        ...requestHeaders,
        Referer: 'https://www.pixiv.net/',
      };
      cb({ requestHeaders });
    }
  );
  mainWindow.loadFile('dist/index.html');

  mainWindow.webContents.openDevTools({ mode: 'detach' });

  ipcMain.handle('requestWorks', async (event, searchURL) => {
    interface NestedObject {
      [key: string]: any;
    }
    function getPropertiesWithKey(obj: NestedObject, key: string): WorkData[] {
      let result: any[] = [];

      for (let prop in obj) {
        if (prop === key) {
          result.push(obj[prop]);
        } else if (typeof obj[prop] === 'object') {
          result = result.concat(getPropertiesWithKey(obj[prop], key));
        }
      }

      return result.flat();
    }
    let bufferStr = '';

    const request = net.request({
      url: searchURL,
      method: 'GET',
      credentials: 'include',
      // useSessionCookies: true,
    });
    return new Promise((resolve) => {
      request.on('response', (response) => {
        console.log(response.statusCode, response.statusMessage);
        response.on('end', () => {
          const rawJson: NestedObject = JSON.parse(bufferStr);
          const works = getPropertiesWithKey(rawJson, 'data');
          const noAdWokrs = works.filter((work) => work.id);
          resolve(noAdWokrs);
        });
        response.on('data', (chunk) => {
          bufferStr += chunk.toString();
        });
      });
      request.end();
    });
  });
});

app.once('window-all-closed', () => app.quit());
