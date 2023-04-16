import { contextBridge, ipcRenderer } from 'electron';
import { IElectronAPI } from './web/types/renderer';
import { WorksData } from './web/types/type';
contextBridge.exposeInMainWorld('storageAPI', {
  // getlist: () => ipcRenderer.invoke('getlist'),
  // setlist: (data: any) => ipcRenderer.invoke('setlist', data),
  setWatchWorks: (displayName: string, worksData: WorksData) =>
    ipcRenderer.invoke('setWatchWorks', worksData),
  getWatchWorks: () => ipcRenderer.invoke('getWatchWorks'),
} as IElectronAPI);

console.log('preloaded!');
