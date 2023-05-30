import { memo, useEffect, useRef, useState } from 'react';

import { useAtom } from 'jotai';
import {
  updateBlockTagAtom,
  updateBlockUserAtom,
  addWatchedAtom,
} from '../../atoms/atom';
import { WorkData } from '../../types/type';
import { useOnScreen } from '../../customHooks/useOnScreen';
import getWatchWorkId from '../../utils/getWatchWorkId';

function WorkCard(props: { workData: WorkData }) {
  const { workData } = props;
  const [expanded, setExpanded] = useState(false);

  const [, updateBlockUser] = useAtom(updateBlockUserAtom);
  const [, updateBlockTag] = useAtom(updateBlockTagAtom);
  const [, addWatched] = useAtom(addWatchedAtom);

  const itemURL = `https://www.pixiv.net/artworks/${workData.id}`;
  const UserURL = `https://www.pixiv.net/users/${workData.userId}`;
  const baseTagsURL = 'https://www.pixiv.net/tags/';

  const ref = useRef<HTMLDivElement>(null);

  const handleExpandClick = () => setExpanded(!expanded);

  const handleWorkClick = () => {
    const watchWorkId = getWatchWorkId();
    if (!watchWorkId) return;

    addWatched(watchWorkId, workData);
  };

  const handleBlockUser = (userName: string, userId: string) => {
    const now = new Date().getTime();

    updateBlockUser({
      name: userName,
      id: Number(userId),
      registeredTime: now,
    });
  };

  const handleBlockTag = (tagName: string) => {
    const now = new Date().getTime();

    updateBlockTag({
      name: tagName,
      id: now,
      registeredTime: now,
    });
  };

  /*   const hasDuplicateElements = (arr1: string[], arr2: string[]): boolean =>
    arr1.some((element) => arr2.includes(element)); */
  const target = useOnScreen(ref);

  useEffect(() => {
    if (!ref.current) return;
    if (target === 'ABOVE_VIEWPORT') {
      const watchWorkId = getWatchWorkId();
      if (!watchWorkId) return;

      addWatched(watchWorkId, workData);
    }
  }, [target]);

  return (
    <div
      className='pf_card'
      ref={ref}
      style={{
        width: '184px',
        border: '1px solid black',
      }}
    >
      <a
        href={itemURL}
        target='_blank'
        rel='nofollow noreferrer noopener'
        onClick={handleWorkClick}
      >
        <img src={workData.url} width={'100%'}></img>
      </a>
      <div
        className='pf_title_container'
        style={{
          display: 'flex',
          margin: '0.5rem',
        }}
        onClick={handleWorkClick}
      >
        <a
          className='work_title'
          href={itemURL}
          target='_blank'
          rel='nofollow noreferrer noopener'
          style={{
            display: 'block',
            color: '#0d6efd',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {workData.title}
        </a>
      </div>
      <div
        className='pf_user_container'
        style={{
          display: 'flex',
          height: '2rem',
          margin: '0.5rem',
          alignItems: 'flex-end',
        }}
      >
        <img
          src={workData.profileImageUrl}
          alt={workData.userName}
          height={'100%'}
        />
        <a
          className='pixiv_user'
          href={UserURL}
          target='_blank'
          style={{
            display: 'block',
            color: '#0d6efd',
            marginLeft: '0.5rem',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
          rel='nofollow noreferrer noopener'
        >
          {workData.userName}
        </a>
        <div
          className='block_user_button'
          style={{
            marginLeft: '0.5rem',
            paddingBottom: '1px',
            userSelect: 'none',
            cursor: 'pointer',
          }}
          onClick={() => handleBlockUser(workData.userName, workData.userId)}
        >
          {'[+]'}
        </div>
      </div>
      <div className='tag_container'>
        <div
          className='tag_toggle_button'
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
        <div className='tags_body'>
          {(workData.tags ?? []).map((tag, index) => (
            <div
              key={index}
              style={expanded ? { display: '' } : { display: 'none' }}
            >
              <div style={{ display: 'flex', margin: '0.5rem' }}>
                <a
                  href={baseTagsURL + tag}
                  target='_blank'
                  rel='nofollow noreferrer noopener'
                  title={tag}
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {tag}
                </a>
                <div
                  className='block_tag_button'
                  style={{
                    marginLeft: '0.5rem',
                    userSelect: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleBlockTag(tag)}
                >
                  {'[+]'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(WorkCard);
