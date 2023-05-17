import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import {
  worksAtom,
  searchWordAtom,
  watchWorksAtom,
  searchUrlAtom,
} from '../atoms/atom';
import { WatchWorks } from '../types/type';

const SaveButton = () => {
  const [searchWord] = useAtom(searchWordAtom);
  const [worksData] = useAtom(worksAtom);
  const [watchWorks, setWatchWorks] = useAtom(watchWorksAtom);
  const [searchURL] = useAtom(searchUrlAtom);

  const handleButton = async () => {
    const now = new Date().getTime();
    const newWatchWork: WatchWorks = {
      [now]: {
        id: now.toString(),
        displayName: searchWord,
        workData: worksData,
        url: searchURL,
        category: 'tag',
      },
    };
    setWatchWorks({ ...watchWorks, ...newWatchWork });
  };

  return <Button onClick={handleButton}>新着通知に登録</Button>;
};
export default SaveButton;
