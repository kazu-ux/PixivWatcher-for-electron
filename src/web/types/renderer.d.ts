import { WatchWork, WorksData } from './type';

export interface IElectronAPI {
  setWatchWorks: (displayName: string, worksData: WorksData) => Promise<void>;
  getWatchWorks: () => Promise<WatchWork[] | null>;
  deleteWatchWork: (displayName: string) => Promise<void>;
}

declare global {
  interface Window {
    storageAPI: IElectronAPI;
  }
}
