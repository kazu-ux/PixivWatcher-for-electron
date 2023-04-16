import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
  Stack,
  Link,
  ImageListItem,
  ImageListItemBar,
  Grid,
} from '@mui/material';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useAtom } from 'jotai';
import { blockTagsAtom, blockUsersAtom, favoritesAtom } from '../atoms/atom';
import { WorksData } from '../types/type';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function IllustCard(illustData: WorksData[0]) {
  const [expanded, setExpanded] = React.useState(false);

  const [blockUsers, setBlockUsers] = useAtom(blockUsersAtom);
  const [blockTags, setBlockTags] = useAtom(blockTagsAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const itemURL = `https://www.pixiv.net/artworks/${illustData.id}`;
  const baseUserURL = 'https://www.pixiv.net/users/';
  const baseTagsURL = 'https://www.pixiv.net/tags/';

  const tags = illustData.tags!;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleBlockUser = () => {
    setBlockUsers([...blockUsers, illustData.userId!]);
    console.log(illustData.userId);
  };

  const handleBlockTag = (tag: string) => {
    setBlockTags([...blockTags, tag]);
    console.log(tag);
  };

  const handleFavorite = () => {
    const clickedIllustId = illustData.id!;
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

  const hasDuplicateElements = (arr1: string[], arr2: string[]): boolean =>
    arr1.some((element) => arr2.includes(element));

  return (
    <Card sx={{ width: '250px' }}>
      <ImageListItem>
        <Link href={itemURL} target='_blank' rel='noopener noreferrer nofollow'>
          <img src={illustData.url}></img>
        </Link>

        <ImageListItemBar
          sx={{ background: 'rgba(0,0,0,0)' }}
          actionIcon={
            <IconButton aria-label='add to favorites' onClick={handleFavorite}>
              {/* {favorites.includes(illustData.id!)? } */}
              <FavoriteIcon
                sx={{
                  color: favorites.includes(illustData.id!) ? 'red' : 'white',
                  stroke: 'black',
                  strokeWidth: 1,
                }}
              />
            </IconButton>
          }
        ></ImageListItemBar>
      </ImageListItem>

      <CardContent>
        <Stack direction={'column'}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Link
              title={illustData.title}
              href={itemURL}
              target='_blank'
              underline='none'
              rel='noopener noreferrer nofollow'
              noWrap
            >
              <Typography noWrap style={{ fontSize: '1rem' }}>
                {illustData.title}
              </Typography>
            </Link>
          </Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'left'}
            spacing={0.5}
          >
            <img
              src={illustData.profileImageUrl}
              style={{ width: '1.5rem' }}
            ></img>
            <Link
              href={baseUserURL + illustData.userId}
              target='_blank'
              underline='none'
              rel='noopener noreferrer nofollow'
              noWrap
            >
              <Typography noWrap style={{ fontSize: '0.9rem' }}>
                {illustData.userName}
              </Typography>
            </Link>

            <IconButton onClick={handleBlockUser}>
              <RemoveCircleOutlineIcon fontSize='small' />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label='share'>
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Stack direction={'column'} alignItems={'flex-start'}>
            {tags.map((tag, index) => {
              //map内の要素にはkeyを付ける
              return (
                <Stack key={index} direction={'row'} alignItems={'center'}>
                  <Link
                    href={baseTagsURL + tag}
                    underline='none'
                    target='_blank'
                    rel='noopener noreferrer nofollow'
                  >
                    <Typography
                      style={{ fontSize: '1rem', wordBreak: 'break-all' }}
                    >
                      {tag}
                    </Typography>
                  </Link>
                  <IconButton
                    onClick={() => {
                      handleBlockTag(tag);
                    }}
                  >
                    <RemoveCircleOutlineIcon fontSize='small' />
                  </IconButton>
                </Stack>
              );
            })}
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
}
