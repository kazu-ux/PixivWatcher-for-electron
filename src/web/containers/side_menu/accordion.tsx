import { useAtom } from 'jotai';
import { useState } from 'react';
import {
  deleteWatchWorkAtom,
  viewedWorksAtom,
  worksAtom,
} from '../../atoms/atom';
import { Link } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

const MyAccordion = () => {
  const [expanded, setExpanded] = useState(true);
  const [watchWorks, deleteWatchWork] = useAtom(deleteWatchWorkAtom);
  const [, setWorksData] = useAtom(worksAtom);
  const [viewedWorks] = useAtom(viewedWorksAtom);

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
        {Object.values(watchWorks).map((watchWork) => (
          <div
            key={watchWork.id}
            className='feed_title_container'
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0.5rem',
            }}
          >
            <Link
              to={`/feed/${watchWork.id}`}
              onClick={() => {
                setWorksData(watchWork.workData);
              }}
            >
              <div>{watchWork.displayName}</div>
            </Link>
            <div style={{ display: 'flex' }}>
              <div className='unread_number_container'>
                <div>
                  {
                    watchWork.workData.filter(
                      (data) => !viewedWorks[watchWork.id].includes(data.id)
                    ).length
                  }
                </div>
              </div>
              <div
                className='delete_icon_button'
                onClick={() => {
                  deleteWatchWork(watchWork.id);
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
