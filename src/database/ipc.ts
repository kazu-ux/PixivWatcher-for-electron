import { IpcMainInvokeEvent, ipcMain } from 'electron';
import Store from 'electron-store';
import { IElectronAPI } from '../web/types/renderer';

const storeData = new Store({ name: 'data' });

type KeysOfIElectronAPI = keyof IElectronAPI; // "setWatchWorks" | "getWatchWorks" | "deleteWatchWork"

const myHandler = (
  channel: KeysOfIElectronAPI,
  listener: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<void> | any
) => ipcMain.handle(channel, listener);

//getlist(data取得処理)
myHandler('setWatchWorks', async (event, data) => {
  console.log(event, data);

  storeData.get('ToDoList', []); //ToDoListがあれば取り出し、なければからのリストを返す
});

//getlist(data保存処理)
myHandler('getWatchWorks', async (event, data) => {
  // storeData.set('ToDoList', data); // 保存
  console.log(data);

  return storeData.get('watchWorks', []);
});
