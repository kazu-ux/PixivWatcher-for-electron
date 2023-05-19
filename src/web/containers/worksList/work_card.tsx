import React, { memo, useState } from 'react';

import { useAtom } from 'jotai';
import { blockTagsAtom, blockUsersAtom, favoritesAtom } from '../../atoms/atom';
import { WorkData } from '../../types/type';

function WorkCard(workData: WorkData) {
  const [expanded, setExpanded] = React.useState(false);

  const [blockUsers, setBlockUsers] = useAtom(blockUsersAtom);
  const [blockTags, setBlockTags] = useAtom(blockTagsAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const itemURL = `https://www.pixiv.net/artworks/${workData.id}`;
  const UserURL = `https://www.pixiv.net/users/${workData.userId}`;
  const baseTagsURL = 'https://www.pixiv.net/tags/';

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavorite = () => {
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
  };

  const handleWorkClick = () => {};

  const hasDuplicateElements = (arr1: string[], arr2: string[]): boolean =>
    arr1.some((element) => arr2.includes(element));

  return (
    <div
      className='pf_card'
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
          onClick={() => {}}
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
                  onClick={() => {}}
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
