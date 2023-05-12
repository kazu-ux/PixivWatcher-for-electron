import path from 'node:path';
import { BrowserWindow, app, ipcMain, net } from 'electron';
import './database/ipc';

import { WorkData } from './web/types/type';

app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    {
      urls: ['https://i.pximg.net/*'],
      // types: ['xmlhttprequest'],
    },
    (detail, cb) => {
      let { requestHeaders } = detail;
      requestHeaders = {
        ...requestHeaders,
        Referer: 'https://www.pixiv.net',
      };
      cb({ requestHeaders });
    }
  );
  mainWindow.loadFile('dist/index.html');

  mainWindow.webContents.openDevTools({ mode: 'detach' });

  ipcMain.handle('requestWorks', async (event, value) => {
    let bufferStr = '';

    const request = net.request({
      url: `https://www.pixiv.net/ajax/search/illustrations/${value}?word=${value}&order=date_d&mode=r18&p=1&s_mode=s_tag&type=illust_and_ugoira&lang=ja`,
      method: 'GET',
      credentials: 'include',
      // useSessionCookies: true,
    });
    return new Promise((resolve) => {
      request.on('response', (response) => {
        console.log(response.statusCode, response.statusMessage);
        response.on('end', () => {
          const works = JSON.parse(bufferStr).body.illust.data as WorkData[];
          resolve(works);
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
