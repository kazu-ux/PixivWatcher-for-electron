import { useAtom } from 'jotai';
import { useState } from 'react';
import {
  deleteWatchWorkAtom,
  updateWatchWorkAtom,
  viewedWorksAtom,
  worksAtom,
} from '../../atoms/atom';
import { NavLink } from 'react-router-dom';
import './accordion.css';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { WatchWork, WorkData } from '../../types/type';

const MyAccordion = () => {
  const [expanded, setExpanded] = useState(true);
  const [watchWorks, deleteWatchWork] = useAtom(deleteWatchWorkAtom);
  const [, setWorksData] = useAtom(worksAtom);
  const [viewedWorks] = useAtom(viewedWorksAtom);
  const [, updateWatchWork] = useAtom(updateWatchWorkAtom);
  const [hover, setHover] = useState<{ [key: string]: boolean }>({});

  const handleExpandClick = () => setExpanded(!expanded);

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
    updateWatchWork(watchWork.id, { ...watchWork, workData: newWorksData });

    const url = document.location.href;
    if (!url.includes('/feed')) return;

    const watchWorkId = url.split('/').at(-1);
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
                  console.log(event.target);
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
                          watchWork.workData.filter(
                            (data) =>
                              !(viewedWorks[watchWork.id] ?? ['']).includes(
                                data.id
                              )
                          ).length
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
        </div>
      </div>
    </div>
  );
};

export default MyAccordion;
