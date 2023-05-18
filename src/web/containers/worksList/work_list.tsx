import React, { useEffect } from 'react';

import { useAtom } from 'jotai';
import { worksAtom } from '../../atoms/atom';
import WorkCard from './work_card';

export default function WorkList() {
  const [workData] = useAtom(worksAtom);

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
        <div key={index} style={style}>
          <WorkCard {...data}></WorkCard>
        </div>
      ))}
    </div>
  );
}
