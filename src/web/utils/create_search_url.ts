import { useAtom } from 'jotai';
import { searchWordAtom } from '../atoms/atom';
import { SearchQuery } from '../types/type';

const createSearchURL = (searchQuery: SearchQuery) => {
  const url = new URL(
    `${searchQuery['searchTarget'][0]}/${searchQuery.searchWord}`,
    'https://www.pixiv.net/ajax/search/'
  );
  const params = url.searchParams;
  params.set('word', searchQuery.searchWord);
  params.set('order', 'date_d');
  params.set('mode', searchQuery.targetAge);
  params.set('p', '1');
  params.set('s_mode', searchQuery.searchMethod);
  params.set('type', searchQuery.searchTarget[1]);
  params.set('lang', 'ja');

  return url.href;
};

export default createSearchURL;
