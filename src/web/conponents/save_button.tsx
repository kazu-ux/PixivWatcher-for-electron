import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import {
  darkModeAtom,
  worksAtom,
  searchWordAtom,
  watchWorksAtom,
  searchUrlAtom,
} from '../atoms/atom';

import createSearchURL from '../utils/create_search_url';
import { WatchWork } from '../types/type';

const SaveButton = () => {
  const [searchWord] = useAtom(searchWordAtom);
  const [worksData] = useAtom(worksAtom);
  const [watchWorks, setWatchWorks] = useAtom(watchWorksAtom);
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const [searchURL] = useAtom(searchUrlAtom);

  const handleButton = async () => {
    const now = new Date().getTime();
    const watchWork: WatchWork = {
      displayName: searchWord,
      WorkData: worksData,
      url: searchURL,
      category: 'tag',
    };
    console.log(watchWorks);

    setWatchWorks([...watchWorks, watchWork]);
  };

  return <Button onClick={handleButton}>新着通知に登録</Button>;
};
export default SaveButton;
