import { useAtom } from 'jotai';
import { useState } from 'react';
import {
  deleteFeedWorkAtom,
  updateFeedWorkAtom,
  updateWorksAtom,
} from '../../atoms/atom';
import { NavLink } from 'react-router-dom';
import './accordion.css';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { WatchWork } from '../../types/type';
import FeedDialog from '../dialog/feed_dialog';
import getWatchWorkId from '../../utils/getWatchWorkId';

const MyAccordion = () => {
  const [expanded, setExpanded] = useState({ tag: true, user: true });
  const [watchWorks, deleteWatchWork] = useAtom(deleteFeedWorkAtom);
  const [worksData, setWorksData] = useAtom(updateWorksAtom);
  const [, updateWatchWork] = useAtom(updateFeedWorkAtom);
  const [hover, setHover] = useState<{ [key: string]: boolean }>({});

  const handleExpandClick = (target: 'tag' | 'user') =>
    setExpanded({ ...expanded, [target]: !expanded[target] });

  const handleUpdateButton = async (watchWork: WatchWork) => {
    const worksData = await window.pixivAPI.requestWorks(watchWork.url);
    if (!worksData) return;

    const newWorksData = [...watchWork.workData, ...worksData]
      .filter(
        (element, index, self) =>
          self.findIndex((e) => e.id === element.id) === index
      )
      .slice()
      .sort((a, b) => Number(b.id) - Number(a.id));
    updateWatchWork(watchWork.id, newWorksData);

    const watchWorkId = getWatchWorkId();
    if (watchWorkId !== watchWork.id) return;
    setWorksData(newWorksData);
  };

  return (
    <div className='category_container'>
      <div className='tag_category_container'>
        <div
          className='category_title'
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>タグ</div>
          <div
            className='toggle_button'
            onClick={() => handleExpandClick('tag')}
            style={{
              height: '2.5rem',
              userSelect: 'none',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div>{expanded['tag'] ? '▲' : '▼'}</div>
          </div>
          <div className='feed_add_button'>+</div>
        </div>
        <div
          className='tags_body'
          style={expanded['tag'] ? { display: '' } : { display: 'none' }}
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
              <NavLink
                to={`/feed/${watchWork.id}`}
                className={({ isActive, isPending }) =>
                  isActive
                    ? 'feed_title active'
                    : isPending
                    ? 'pending'
                    : 'feed_title'
                }
                onClick={(event) => {
                  setWorksData(watchWork.workData);
                }}
              >
                <div>{watchWork.displayName}</div>
              </NavLink>

              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <div
                  className='unread_update_container'
                  onMouseEnter={() => setHover({ [watchWork.id]: true })}
                  onMouseLeave={() => setHover({ [watchWork.id]: false })}
                >
                  <div>
                    {hover[watchWork.id] ? (
                      <div
                        className='update_button'
                        onClick={() => {
                          handleUpdateButton(watchWork);
                        }}
                      >
                        <RefreshIcon />
                      </div>
                    ) : (
                      <div
                        className='unread_number'
                        style={{
                          paddingBottom: '6px',
                        }}
                      >
                        {
                          watchWork.workData
                            .filter((work) => !work.isBlocked)
                            .filter((work) => !work.isWatched).length
                        }
                      </div>
                    )}
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
      <div className='user_category_container'>
        <div
          className='category_title'
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div>ユーザー</div>
          <div
            className='toggle_button'
            onClick={() => handleExpandClick('user')}
            style={{
              height: '2.5rem',
              userSelect: 'none',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <div>{expanded['user'] ? '▲' : '▼'}</div>
          </div>
          <FeedDialog></FeedDialog>
        </div>
      </div>
    </div>
  );
};

export default MyAccordion;
