import { WatchWork, WorkData } from './type';

export interface IElectronAPI {
  setWatchWorks: (displayName: string, worksData: WorkData[]) => Promise<void>;
  getWatchWorks: () => Promise<WatchWork[] | null>;
  deleteWatchWork: (displayName: string) => Promise<void>;
}

export interface PixivAPI {
  requestWorks: (value: string) => Promise<WorkData[]>;
}

declare global {
  interface Window {
    storageAPI: IElectronAPI;
    pixivAPI: PixivAPI;
  }
}
