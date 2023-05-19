import { useEffect } from 'react';
import './work_list.css';

import { useAtom } from 'jotai';
import { viewedWorksAtom, worksAtom } from '../../atoms/atom';
import WorkCard from './work_card';
import classNames from 'classnames';

export default function WorkList() {
  const [workData] = useAtom(worksAtom);
  const [viewedWorks] = useAtom(viewedWorksAtom);

  const style = { margin: '0.5rem' };

  useEffect(() => {
    const viewedElements = document.querySelectorAll('.viewed');
    viewedElements.forEach((element) => {
      element.classList.add('hidden');
    });
  }, [workData]);

  const url = document.location.href;
  const watchWorkId = url.split('/').at(-1) ?? '';

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
          <WorkCard {...data}></WorkCard>
        </div>
      ))}
    </div>
  );
}
