import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import {
  SearchQuery,
  BlockType,
  WatchWork,
  WatchWorks,
  WorkData,
  viewedWorks,
} from '../types/type';
import { produce } from 'immer';

export const countAtom = atom(0);
export const openAtom = atom(false);
export const loadingAtom = atom(false);

const worksAtom = atom<WorkData[]>([]);
export const filteredWorksAtom = atom((get) => {
  const hasDuplicateElements = (arr1: string[], arr2: string[]): boolean =>
    arr1.some((element) => arr2.includes(element));
  const works = get(worksAtom);
  const blockUsers = get(blockUsersAtom).map((user) => user.id.toString());
  const blockTags = get(blockTagsAtom).map((tag) => tag.name);

  const filteredWokrs: WorkData[] = works.map((work) =>
    hasDuplicateElements([work.userId], blockUsers) ||
    hasDuplicateElements(work.tags, blockTags)
      ? { ...work, isBlocked: true }
      : { ...work, isBlocked: false }
  );

  console.log(filteredWokrs);

  return filteredWokrs;
});
export const updateWorksAtom = atom(null, (get, set, works: WorkData[]) => {
  set(worksAtom, works);
});

const blockUsersAtom = atomWithStorage<BlockType[]>('blockUsers', []);
export const updateBlockUserAtom = atom(
  (get) => get(blockUsersAtom),
  (get, set, user: BlockType) => {
    const oldBlockUsers = get(blockUsersAtom);
    // 保存済みのユーザーIDを保存しない
    if (oldBlockUsers.map((user) => user.id).includes(user.id)) return;

    const newBlockUsers = [...get(blockUsersAtom), ...[user]];
    set(blockUsersAtom, newBlockUsers);
    console.log(newBlockUsers);
  }
);

const blockTagsAtom = atomWithStorage<BlockType[]>('blockTags', []);
export const updateBlockTagAtom = atom(
  (get) => get(blockTagsAtom),
  (get, set, tag: BlockType) => {
    const oldBlockTags = get(blockTagsAtom);
    // 保存済みのユーザーIDを保存しない
    if (oldBlockTags.map((tag) => tag.name).includes(tag.name)) return;

    const newBlockTags = [...get(blockTagsAtom), ...[tag]];
    set(blockTagsAtom, newBlockTags);
    console.log(newBlockTags);
  }
);

export const favoritesAtom = atom<string[]>([]);
const viewedWorksAtom = atomWithStorage<viewedWorks>('viewedWorks', {});
export const updateViewedWorksAtom = atom(
  (get) => get(viewedWorksAtom),
  (get, set, watchWorkId: string, workIds: string[]) => {
    const newViewedWorks = produce(get(viewedWorksAtom), (draft) => {
      const uniqueWatchWorkIds = Array.from(
        new Set([...(draft[watchWorkId] ?? []), ...workIds])
      );
      draft[watchWorkId] = uniqueWatchWorkIds;
    });

    set(viewedWorksAtom, newViewedWorks);
    console.log(newViewedWorks);
  }
);

export const searchWordAtom = atom<string>('');
export const searchUrlAtom = atom<string>('');
const watchWorksAtom = atomWithStorage<WatchWorks>('watchWorks', {});
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

export const titleAtom = atom('ページタイトル');
