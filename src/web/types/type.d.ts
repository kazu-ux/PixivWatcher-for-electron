type UserData = { userId: string; userName: string };
type RequestFlag = { requestFlag: boolean };

export type WorkData = {
  id: string;
  title: string;
  illustType?: number;
  xRestrict: number;
  restrict: number;
  sl?: number;
  url: string;
  description: string;
  tags: Array<string>;
  userId: string;
  userName: string;
  width?: number;
  height?: number;
  pageCount?: number;
  isBookmarkable: boolean;
  bookmarkData: unknown;
  alt?: string;
  titleCaptionTranslation: {
    workTitle: unknown;
    workCaption: unknown;
  };
  createDate: string;
  updateDate: string;
  isUnlisted: boolean;
  isMasked: boolean;
  profileImageUrl: string;
  textCount?: number;
  wordCount?: number;
  readingTime?: number;
  useWordCount?: boolean;
  bookmarkCount?: number;
  isOriginal?: boolean;
  marker: unknown;
  seriesId?: string;
  seriesTitle?: string;
};

type SearchTop = {
  body: {
    illustManga?: { data: WorkData[] };
    novel?: { data: WorkData[] };
    popular?: { recent: WorkData[]; permanent: WorkData[] };
  };
};

type Illustrations = {
  body: {
    illust?: { data: WorkData[] };
    popular?: { recent: WorkData[]; permanent: WorkData[] };
    thumbnails?: { illust: WorkData[]; novel: WorkData[] };
  };
};

type Manga = {
  body: {
    manga?: { data: WorkData[] };
    popular?: { recent: WorkData[]; permanent: WorkData[] };
    thumbnails?: { illust: WorkData[]; novel: WorkData[] };
  };
};

type Novels = {
  body: {
    novel?: { data: WorkData[] };
    thumbnails?: {
      illust: WorkData[];
      novel: WorkData[];
      novelSeries: WorkData[];
    };
  };
};

type Artworks = SearchTop;

export interface Candidates {
  candidates?: CandidatesEntity[] | null;
}
export interface CandidatesEntity {
  tag_name: string;
  access_count: string;
  type: string;
}

export type WatchWork = {
  displayName: string;
  WorkData: WorkData[];
  url: string;
};