import path from 'node:path';
import { BrowserWindow, app, session, ipcMain } from 'electron';
import './database/ipc';

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('dist/index.html');
  mainWindow.webContents.openDevTools({ mode: 'detach' });
  mainWindow.webContents.session.webRequest.onBeforeSendHeaders(
    {
      urls: ['https://i.pximg.net/*'],
      // types: ['xmlhttprequest'],
    },
    (detail, cb) => {
      let { requestHeaders } = detail;
      requestHeaders = Object.assign(requestHeaders, {
        Referer: 'https://www.pixiv.net',
      });
      cb({ requestHeaders });
    }
  );
});

app.once('window-all-closed', () => app.quit());
