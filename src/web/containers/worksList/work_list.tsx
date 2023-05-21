import { useCallback, useEffect, useState } from 'react';
import './work_list.css';

import { useAtom } from 'jotai';
import { viewedWorksAtom, worksAtom } from '../../atoms/atom';
import WorkCard from './work_card';
import classNames from 'classnames';
import useInterval from '../../customHooks/useInterval';
import { produce } from 'immer';

export default function WorkList() {
  const [workData] = useAtom(worksAtom);
  const [viewedWorks, setViewedWorks] = useAtom(viewedWorksAtom);
  const [viewedWorksCount, setViewedWorksCount] = useState(0);
  const [viewedWorkIds, setViewedWorkIds] = useState<string[]>([]);

  useInterval(() => {
    const newViewedWorks = Array.from(document.querySelectorAll('.viewed')).map(
      (element) => element.id
    );

    setViewedWorkIds(newViewedWorks);
    setViewedWorksCount(newViewedWorks.length);
  }, 1000);

  useEffect(() => {
    const url = document.location.href;
    if (!url.includes('/feed')) return;

    const watchWorkId = url.split('/').at(-1);
    if (!watchWorkId) return;

    if (!viewedWorkIds.length) return;

    const newViewedWorks = produce(viewedWorks, (draft) => {
      const uniqueWatchWorkIds = Array.from(
        new Set([...(draft[watchWorkId] ?? []), ...viewedWorkIds])
      );
      draft[watchWorkId] = uniqueWatchWorkIds;
    });
    setViewedWorks(newViewedWorks);
  }, [viewedWorksCount]);

  const style = { margin: '0.5rem' };

  const url = document.location.href;
  const watchWorkId = url.split('/').at(-1) ?? '';

  const intersectCallback = useCallback((str: string) => {
    // setTestArray((pre) => [...pre, str]);
    // console.log(testArray);
  }, []);

  return (
    <div
      className='grid_container'
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gridTemplateRows: 'auto',
      }}
    >
      {workData.map((data, index) => (
        <div
          key={index}
          id={data.id}
          style={style}
          className={classNames(
            /*      {
              block:
                hasDuplicateElements(tags, blockTags) ||
                hasDuplicateElements([userId!], blockUsers),
            },
            {
              hidden:
                hasDuplicateElements(tags, blockTags) ||
                hasDuplicateElements([userId!], blockUsers),
            }, */
            {
              viewed: (viewedWorks[watchWorkId] ?? ['']).includes(data.id),
            }
          )}
        >
          <WorkCard workData={data}></WorkCard>
        </div>
      ))}
    </div>
  );
}
