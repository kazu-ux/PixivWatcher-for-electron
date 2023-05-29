import { Button } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import {
  filteredWorksAtom,
  searchWordAtom,
  updateFeedWorkAtom,
  searchUrlAtom,
  updateWorksAtom,
  addFeedAtom,
} from '../atoms/atom';
import { WatchWork } from '../types/type';

const SaveButton = () => {
  const [searchWord] = useAtom(searchWordAtom);
  const worksData = useAtomValue(filteredWorksAtom);
  const [, addfeedWork] = useAtom(addFeedAtom);
  const [searchURL] = useAtom(searchUrlAtom);

  const handleButton = async () => {
    const now = new Date().getTime().toString();

    const newWatchWork: WatchWork = {
      id: now,
      displayName: searchWord,
      workData: worksData,
      url: searchURL,
      category: 'tag',
    };
    addfeedWork(now, newWatchWork);
  };

  return <Button onClick={handleButton}>新着通知に登録</Button>;
};
export default SaveButton;
