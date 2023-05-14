import { useAtom } from 'jotai';
import { useState } from 'react';
import { watchWorksAtom, worksAtom } from '../../atoms/atom';
import { Link } from 'react-router-dom';
const MyAccordion = () => {
  const [expanded, setExpanded] = useState(true);
  const [watchWorks] = useAtom(watchWorksAtom);
  const [, setWorksData] = useAtom(worksAtom);

  const array = ['ドラえもん', 'のび太', '1234'];

  const handleExpandClick = () => setExpanded(!expanded);
  return (
    <div className='category_container'>
      <div className='category_title' style={{ display: 'flex' }}>
        <div>タグ</div>
        <div
          className='toggle_button'
          onClick={handleExpandClick}
          style={{
            height: '2.5rem',
            userSelect: 'none',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <div>{expanded ? '▲' : '▼'}</div>
        </div>
        <div className='feed_add_button'>+</div>
      </div>

      <div
        className='tags_body'
        style={expanded ? { display: '' } : { display: 'none' }}
      >
        {watchWorks.map((watchWork, index) => (
          <Link
            to={'/feed'}
            key={index}
            onClick={() => {
              setWorksData(watchWork.WorkData);
            }}
          >
            <div>{watchWork.displayName}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyAccordion;
