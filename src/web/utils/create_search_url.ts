import { useAtom } from 'jotai';
import { searchWordAtom } from '../atoms/atom';

const createSearchURL = (searchWord: string) => {
  const url = `https://www.pixiv.net/ajax/search/illustrations/${searchWord}?word=${searchWord}&order=date_d&mode=all&p=1&s_mode=s_tag&type=illust_and_ugoira&lang=ja`;
  return url;
};

export default createSearchURL;
