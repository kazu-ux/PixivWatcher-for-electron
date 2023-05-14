import { useAtom } from 'jotai';
import { useState } from 'react';
import { deleteWatchWorkAtom, worksAtom } from '../../atoms/atom';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

const MyAccordion = () => {
  const [expanded, setExpanded] = useState(true);
  const [watchWorks, deleteWatchWork] = useAtom(deleteWatchWorkAtom);
  const [, setWorksData] = useAtom(worksAtom);

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
          <div
            key={index}
            className='feed_title_container'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0.5rem',
            }}
          >
            <Link
              to={'/feed'}
              onClick={() => {
                setWorksData(watchWork.WorkData);
              }}
            >
              <div>{watchWork.displayName}</div>
            </Link>
            <div style={{ display: 'flex' }}>
              <div
                className='delete_icon_button'
                onClick={() => {
                  deleteWatchWork(watchWork);
                }}
              >
                <DeleteIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccordion;
