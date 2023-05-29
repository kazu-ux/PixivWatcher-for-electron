import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import {
  filteredWorksAtom,
  searchWordAtom,
  updateWatchWorkAtom,
  searchUrlAtom,
  updateViewedWorksAtom,
} from '../atoms/atom';
import { WatchWork } from '../types/type';

const SaveButton = () => {
  const [searchWord] = useAtom(searchWordAtom);
  const [worksData] = useAtom(filteredWorksAtom);
  const [, setWatchWorks] = useAtom(updateWatchWorkAtom);
  const [searchURL] = useAtom(searchUrlAtom);

  const [, setViewedWorks] = useAtom(updateViewedWorksAtom);

  const handleButton = async () => {
    const now = new Date().getTime().toString();
    const newWatchWork: WatchWork = {
      id: now,
      displayName: searchWord,
      workData: worksData,
      url: searchURL,
      category: 'tag',
    };
    setWatchWorks(now, newWatchWork);

    setViewedWorks(now, []);
  };

  return <Button onClick={handleButton}>新着通知に登録</Button>;
};
export default SaveButton;
