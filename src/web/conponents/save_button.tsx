import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import {
  darkModeAtom,
  worksAtom,
  searchWordAtom,
  watchWorksAtom,
} from '../atoms/atom';

import createSearchURL from '../utils/create_search_url';

const SaveButton = () => {
  const [searchWord] = useAtom(searchWordAtom);
  const [worksData] = useAtom(worksAtom);
  const [watchWorks, setWatchWorks] = useAtom(watchWorksAtom);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const handleButton = async () => {
    /*     const hasDisplayName = await ChromeStorage.findWatchWork(searchWord);
    if (hasDisplayName) return alert('すでに登録済みです'); */

    setWatchWorks([
      ...watchWorks,
      { displayName: searchWord, worksData, url: createSearchURL(searchWord) },
    ]);
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  return <Button onClick={handleButton}>新着通知に登録</Button>;
};
export default SaveButton;
