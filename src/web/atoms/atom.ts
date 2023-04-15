import { atom } from 'jotai';
import { WatchWork, WorksData } from '../types/type';

export const countAtom = atom(0);
export const openAtom = atom(false);
export const loadingAtom = atom(false);

export const illustDataAtom = atom<WorksData>([]);
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
export const searchWordAtom = atom<string>('');
export const searchUrlAtom = atom<string>('');
export const watchWorksAtom = atom<WatchWork[]>([]);
