import { useAtom } from 'jotai';
import { useState } from 'react';
import { watchWorksAtom } from '../../atoms/atom';
import { Link } from 'react-router-dom';
// import './accordion.css';

const MyAccordion = () => {
  const [expanded, setExpanded] = useState(true);
  const [watchWorks] = useAtom(watchWorksAtom);

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
          <Link to={'/feed'}>
            <div key={index}>{watchWork.displayName}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyAccordion;
