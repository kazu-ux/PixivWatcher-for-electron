import React, { memo, useEffect, useRef, useState } from 'react';

import { useAtom } from 'jotai';
import {
  // blockTagsAtom,
  // blockUsersAtom,
  // favoritesAtom,
  viewedWorksAtom,
} from '../../atoms/atom';
import { WorkData } from '../../types/type';
import { produce } from 'immer';
import { useOnScreen } from '../../customHooks/useOnScreen';

function WorkCard(props: { workData: WorkData }) {
  const { workData } = props;
  const [expanded, setExpanded] = React.useState(false);

  // const [blockUsers, setBlockUsers] = useAtom(blockUsersAtom);
  // const [blockTags, setBlockTags] = useAtom(blockTagsAtom);
  // const [favorites, setFavorites] = useAtom(favoritesAtom);

  const [viewedWorks, setViewedWorks] = useAtom(viewedWorksAtom);

  const itemURL = `https://www.pixiv.net/artworks/${workData.id}`;
  const UserURL = `https://www.pixiv.net/users/${workData.userId}`;
  const baseTagsURL = 'https://www.pixiv.net/tags/';

  const ref = React.useRef<HTMLDivElement>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /*   const handleFavorite = () => {
    const clickedIllustId = workData.id!;
    // favoritesにclickedIllustIdが含まれているかどうかを判定する
    const isFavorite = favorites.includes(clickedIllustId);
    // isFavoriteがtrueならclickedIllustIdを除外し、falseなら追加する
    const newFavorites = isFavorite
      ? favorites.filter((favorite) => favorite !== clickedIllustId)
      : [...favorites, clickedIllustId];
    // newFavoritesをセットする
    setFavorites(newFavorites);
    console.log(favorites);
  }; */

  const handleWorkClick = () => {
    const url = document.location.href;
    if (!url.includes('/feed')) return;

    const watchWorkId = url.split('/').at(-1);
    if (!watchWorkId) return;

    // ref.current?.classList.add('viewed');

    const newViewedWorks = produce(viewedWorks, (draft) => {
      draft[watchWorkId] = [...draft[watchWorkId], workData.id];
    });

    setViewedWorks(newViewedWorks);
  };

  /*   const hasDuplicateElements = (arr1: string[], arr2: string[]): boolean =>
    arr1.some((element) => arr2.includes(element)); */
  const target = useOnScreen(ref);

  useEffect(() => {
    if (!ref.current) return;
    if (target === 'ABOVE_VIEWPORT') {
      const url = document.location.href;
      if (!url.includes('/feed')) return;

      const watchWorkId = url.split('/').at(-1);
      if (!watchWorkId) return;

      ref.current?.parentElement?.classList.add('viewed');
    }
  }, [target]);

  return (
    <div
      className='pf_card'
      id={workData.id}
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
