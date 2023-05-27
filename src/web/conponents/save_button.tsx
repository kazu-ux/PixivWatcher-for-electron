import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import {
  worksAtom,
  searchWordAtom,
  watchWorksAtom,
  searchUrlAtom,
  updateViewedWorksAtom,
} from '../atoms/atom';
import { WatchWorks } from '../types/type';
import { produce } from 'immer';

const SaveButton = () => {
  const [searchWord] = useAtom(searchWordAtom);
  const [worksData] = useAtom(worksAtom);
  const [watchWorks, setWatchWorks] = useAtom(watchWorksAtom);
  const [searchURL] = useAtom(searchUrlAtom);

  const [viewedWorks, setViewedWorks] = useAtom(updateViewedWorksAtom);

  const handleButton = async () => {
    const now = new Date().getTime().toString();
    const newWatchWork: WatchWorks = {
      [now]: {
        id: now,
        displayName: searchWord,
        workData: worksData,
        url: searchURL,
        category: 'tag',
      },
    };
    setWatchWorks({ ...watchWorks, ...newWatchWork });

    const newViewedWorks = produce(viewedWorks, (draft) => {
      draft[now] = [];
    });
    setViewedWorks(newViewedWorks);
  };

  return <Button onClick={handleButton}>新着通知に登録</Button>;
};
export default SaveButton;
