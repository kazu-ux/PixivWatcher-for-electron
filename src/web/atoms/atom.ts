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

const blockUsersAtom = atomWithStorage<BlockType[]>('blockUsers', []);
export const updateBlockUserAtom = atom(
  (get) => get(blockUsersAtom),
  (get, set, user: BlockType) => {
    const oldBlockUsers = get(blockUsersAtom);
    // 保存済みのユーザーIDを保存しない
    if (oldBlockUsers.map((user) => user.id).includes(user.id)) return;

    const newBlockUsers = [...get(blockUsersAtom), ...[user]];
    set(blockUsersAtom, newBlockUsers);
    set(updateWorksAtom, get(filteredWorksAtom));
  }
);

const blockTagsAtom = atomWithStorage<BlockType[]>('blockTags', []);
export const updateBlockTagAtom = atom(
  (get) => get(blockTagsAtom),
  (get, set, tag: BlockType) => {
    const oldBlockTags = get(blockTagsAtom);
    // 保存済みのタグを保存しない
    if (oldBlockTags.map((tag) => tag.name).includes(tag.name)) return;

    const newBlockTags = [...get(blockTagsAtom), ...[tag]];
    set(blockTagsAtom, newBlockTags);
    set(updateWorksAtom, get(filteredWorksAtom));
  }
);

const worksAtom = atomWithStorage<WorkData[]>('worksData', []);
export const filteredWorksAtom = atom((get) => get(worksAtom));

export const updateWorksAtom = atom(
  (get) => get(worksAtom),
  (get, set, works: WorkData[]) => {
    const hasDuplicateElements = (arr1: string[], arr2: string[]): boolean =>
      arr1.some((element) => arr2.includes(element));
    const blockUsers = get(blockUsersAtom).map((user) => user.id.toString());
    const blockTags = get(blockTagsAtom).map((tag) => tag.name);

    const filteredWokrs: WorkData[] = works.map((work) =>
      hasDuplicateElements([work.userId], blockUsers) ||
      hasDuplicateElements(work.tags, blockTags)
        ? { ...work, isBlocked: true }
        : { ...work, isBlocked: false }
    );

    set(worksAtom, filteredWokrs);
  }
);

export const addWatchedAtom = atom(
  null,
  (get, set, feedId: string, work: WorkData) => {
    const newWatchWork = { ...work, isWatched: true };

    const updatedWorkArray = produce(get(worksAtom), (draft) => {
      const index = draft.findIndex((oldWork) => oldWork.id === work.id);
      if (index !== -1) draft[index] = newWatchWork;
    });

    set(worksAtom, updatedWorkArray);
    set(updateFeedWorkAtom, feedId, updatedWorkArray);
  }
);

export const favoritesAtom = atom<string[]>([]);

export const searchWordAtom = atom<string>('');
export const searchUrlAtom = atom<string>('');

const feedWorksAtom = atomWithStorage<WatchWorks>('watchWorks', {});
export const addFeedAtom = atom(
  null,
  (get, set, feedId: string, feedWork: WatchWork) => {
    set(feedWorksAtom, { ...get(feedWorksAtom), ...{ [feedId]: feedWork } });
  }
);
export const deleteFeedWorkAtom = atom(
  (get) => get(feedWorksAtom),
  (get, set, watchWorkId: string) => {
    const { [watchWorkId]: _, ...newWatchWorks } = get(feedWorksAtom);
    set(feedWorksAtom, newWatchWorks);
  }
);
export const updateFeedWorkAtom = atom(
  null,
  (get, set, watchWorkId: string, worksData: WorkData[]) => {
    const newWatchWorks = {
      ...get(feedWorksAtom),
      [watchWorkId]: {
        ...get(feedWorksAtom)[watchWorkId],
        workData: worksData,
      },
    };
    set(feedWorksAtom, newWatchWorks);
  }
);

export const searchQueryAtom = atom<SearchQuery>({
  searchWord: '',
  searchTarget: ['artworks', 'all'],
  searchMethod: 's_tag',
  targetAge: 'safe',
});

export const titleAtom = atom('ページタイトル');
