import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Store from 'electron-store';

import {
  SearchQuery,
  WatchWork,
  WatchWorks,
  WorkData,
  viewedWorks,
} from '../types/type';

export const countAtom = atom(0);
export const openAtom = atom(false);
export const loadingAtom = atom(false);

export const worksAtom = atom<WorkData[]>([]);
export const blockUsersAtom = atom<string[]>([
  /* '29727051',
  '22033781',
  '35868393',
     '15193250',
  '43534506',
  '703041',
  '30506052', */
]);
export const blockTagsAtom = atom<string[]>([]);
export const favoritesAtom = atom<string[]>([]);
export const viewedWorksAtom = atomWithStorage<viewedWorks>('viewedWorks', {});

export const searchWordAtom = atom<string>('');
export const searchUrlAtom = atom<string>('');
export const watchWorksAtom = atomWithStorage<WatchWorks>('watchWorks', {});
export const deleteWatchWorkAtom = atom(
  (get) => get(watchWorksAtom),
  (get, set, watchWorkId: string) => {
    const { [watchWorkId]: _, ...newWatchWorks } = get(watchWorksAtom);
    set(watchWorksAtom, newWatchWorks);

    const { [watchWorkId]: __, ...newViewedWorks } = get(viewedWorksAtom);
    set(viewedWorksAtom, newViewedWorks);
  }
);
export const updateWatchWorkAtom = atom(
  null,
  (get, set, watchWorkId: string, watchWork: WatchWork) => {
    const newWatchWorks = { ...get(watchWorksAtom), [watchWorkId]: watchWork };
    set(watchWorksAtom, newWatchWorks);
  }
);

export const searchQueryAtom = atom<SearchQuery>({
  searchWord: '',
  searchTarget: ['artworks', 'all'],
  searchMethod: 's_tag',
  targetAge: 'safe',
});
