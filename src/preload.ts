import { contextBridge, ipcRenderer } from 'electron';
import { IElectronAPI } from './web/types/renderer';
import { WorkData } from './web/types/type';
// import fetch from 'electron-fetch';

contextBridge.exposeInMainWorld('storageAPI', {
  // getlist: () => ipcRenderer.invoke('getlist'),
  // setlist: (data: any) => ipcRenderer.invoke('setlist', data),
  setWatchWorks: (displayName: string, worksData: WorkData[]) =>
    ipcRenderer.invoke('setWatchWorks', worksData),
  getWatchWorks: () => ipcRenderer.invoke('getWatchWorks'),
} as IElectronAPI);

contextBridge.exposeInMainWorld('pixivAPI', {
  requestWorks: (value: string) => {
    return ipcRenderer.invoke('requestWorks', value);
  },
});

console.log('preloaded!');
