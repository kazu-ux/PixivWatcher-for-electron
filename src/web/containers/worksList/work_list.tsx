import { useEffect, useRef } from 'react';
import './work_list.css';

import { useAtom } from 'jotai';
import { updateViewedWorksAtom, worksAtom } from '../../atoms/atom';
import WorkCard from './work_card';
import classNames from 'classnames';

import { produce } from 'immer';

import getWatchWorkId from '../../utils/getWatchWorkId';
import useMutationObserver from '../../customHooks/useMutationObserver';

export default function WorkList() {
  const [workData] = useAtom(worksAtom);
  const [viewedWorks, updateViewedWork] = useAtom(updateViewedWorksAtom);

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
