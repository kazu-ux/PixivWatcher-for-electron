import { useCallback, useEffect, useRef, useState } from 'react';
import './work_list.css';

import { useAtom } from 'jotai';
import { viewedWorksAtom, worksAtom } from '../../atoms/atom';
import WorkCard from './work_card';
import classNames from 'classnames';
import useInterval from '../../customHooks/useInterval';
import { produce } from 'immer';
import { WorkData } from '../../types/type';
import getWatchWorkId from '../../utils/getWatchWorkId';

export default function WorkList() {
  const [workData] = useAtom(worksAtom);
  const [viewedWorks, setViewedWorks] = useAtom(viewedWorksAtom);
  const [viewedWorksCount, setViewedWorksCount] = useState(0);
  const viewedWorkIds = useRef<string[]>([]);

  const watchWorkId = getWatchWorkId();

  useInterval(() => {
    const newViewedWorks = Array.from(document.querySelectorAll('.viewed')).map(
      (element) => element.id
    );

    viewedWorkIds.current = newViewedWorks;
    setViewedWorksCount(newViewedWorks.length);
  }, 1000);

  useEffect(() => {
    if (!watchWorkId || !viewedWorkIds.current.length) return;

    const newViewedWorks = produce(viewedWorks, (draft) => {
      const uniqueWatchWorkIds = Array.from(
        new Set([...(draft[watchWorkId] ?? []), ...viewedWorkIds.current])
      );
      draft[watchWorkId] = uniqueWatchWorkIds;
    });
    setViewedWorks(newViewedWorks);
  }, [viewedWorksCount]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [workData]);

  const callback = useCallback(
    (element: HTMLDivElement | null, data: WorkData) => {
      if (!watchWorkId) return;
      if ((viewedWorks[watchWorkId] ?? ['']).includes(data.id)) {
        element?.classList.add('hidden');
      }
    },
    [workData]
  );

  return (
    <div
      className='grid_container'
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gridTemplateRows: 'auto',
      }}
    >
      {workData.map((data, index) => (
        <div
          ref={(element) => {
            callback(element, data);
          }}
          key={data.id}
          id={data.id}
          className={
            classNames({
              // hidden: (viewedWorks[watchWorkId] ?? ['']).includes(data.id),
            })
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
          }
        >
          <WorkCard workData={data}></WorkCard>
        </div>
      ))}
    </div>
  );
}
