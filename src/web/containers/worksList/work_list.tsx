import { useEffect, useRef, useState } from 'react';
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
  const viewedWorkIds = useRef<string[]>([]);

  const currentURL = document.location.href;
  const watchWorkId = currentURL.split('/').at(-1) ?? '';

  useInterval(() => {
    const newViewedWorks = Array.from(document.querySelectorAll('.viewed')).map(
      (element) => element.id
    );

    viewedWorkIds.current = newViewedWorks;
    setViewedWorksCount(newViewedWorks.length);
  }, 1000);

  useEffect(() => {
    if (!currentURL.includes('/feed')) return;
    if (!watchWorkId || !viewedWorkIds.current.length) return;

    const newViewedWorks = produce(viewedWorks, (draft) => {
      const uniqueWatchWorkIds = Array.from(
        new Set([...(draft[watchWorkId] ?? []), ...viewedWorkIds.current])
      );
      draft[watchWorkId] = uniqueWatchWorkIds;
    });
    setViewedWorks(newViewedWorks);
  }, [viewedWorksCount]);

  const style = { margin: '0.5rem' };

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
          className={
            classNames({
              viewed: (viewedWorks[watchWorkId] ?? ['']).includes(data.id),
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
