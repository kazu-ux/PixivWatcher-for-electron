import { useCallback, useEffect, useRef, useState } from 'react';
import './work_list.css';

import { useAtom, useAtomValue } from 'jotai';
import { updateViewedWorksAtom, worksAtom } from '../../atoms/atom';
import WorkCard from './work_card';
import classNames from 'classnames';
import useInterval from '../../customHooks/useInterval';
import { produce } from 'immer';
import { WorkData } from '../../types/type';
import getWatchWorkId from '../../utils/getWatchWorkId';
import useMutationObserver from '../../customHooks/useMutationObserver';

export default function WorkList() {
  const [workData] = useAtom(worksAtom);
  const [viewedWorksCount, setViewedWorksCount] = useState(0);
  const [viewedWorks, updateViewedWork] = useAtom(updateViewedWorksAtom);

  const viewedWorkIds = useRef<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const mutationObserverCallback = (records: MutationRecord[]) => {
    const watchWorkId = getWatchWorkId();
    if (!watchWorkId) return;
    const viewedWorkIds = records
      .map((record) => record.target as HTMLElement)
      .filter((element) => element.classList.contains('viewed'))
      .filter((element) => !element.classList.contains('hidden'))
      .map((element) => element.id);
    if (!viewedWorkIds.length) return;

    const newViewedWorks = produce(viewedWorks, (draft) => {
      draft[watchWorkId] = viewedWorkIds;
    });
    updateViewedWork(newViewedWorks);
  };

  useMutationObserver(ref, mutationObserverCallback, {
    attributes: true,
    characterData: false,
    childList: false,
    subtree: true,
  });

  const watchWorkId = getWatchWorkId();

  useEffect(() => {
    if (!watchWorkId) return;
    console.log('feed');
    ref.current
      ?.querySelectorAll('.viewed')
      .forEach((element) => element.classList.add('hidden'));
  }, [workData]);

  // const watchWorkId = useCallback(() => getWatchWorkId(), []);
  // console.log(watchWorkId());

  // console.log(watchWorkId);

  // useInterval(() => {
  //   const newViewedWorks = Array.from(document.querySelectorAll('.viewed')).map(
  //     (element) => element.id
  //   );

  //   viewedWorkIds.current = newViewedWorks;
  //   setViewedWorksCount(newViewedWorks.length);
  // }, 100);

  // useEffect(() => {
  //   if (!watchWorkId || !viewedWorkIds.current.length) return;

  //   const newViewedWorks = produce(viewedWorks, (draft) => {
  //     const uniqueWatchWorkIds = Array.from(
  //       new Set([...(draft[watchWorkId] ?? []), ...viewedWorkIds.current])
  //     );
  //     draft[watchWorkId] = uniqueWatchWorkIds;
  //   });
  //   setViewedWorks(newViewedWorks);
  // }, [viewedWorksCount]);

  // const callback = useCallback(
  //   (element: HTMLDivElement | null, data: WorkData) => {
  //     window.scrollTo(0, 0);

  //     if (!watchWorkId) return;
  //     /* if ((viewedWorks[watchWorkId] ?? ['']).includes(data.id)) {
  //       element?.classList.add('hidden');
  //     } */
  //   },
  //   [watchWorkId()]
  // );

  return (
    <div
      ref={ref}
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
          // ref={(element) => {
          //   callback(element, data);
          // }}
          key={data.id}
          id={data.id}
          className={
            classNames({
              viewed: (viewedWorks[watchWorkId ?? ''] ?? ['']).includes(
                data.id
              ),
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
