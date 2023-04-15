import { Paper, Stack, Typography, styled } from '@mui/material';
import { DRAWERWIDTH } from '../consts/const';

const About = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Stack
      spacing={2}
      margin={1}
      sx={{ width: `calc(100% - ${DRAWERWIDTH}px)`, ml: `${DRAWERWIDTH}px` }}
    >
      <Typography variant='h5'>Animelクローンについて</Typography>
      <Item>
        <Typography variant='h5'>Animelとは</Typography>
        <Typography variant='body1'>
          今期のアニメから過去のアニメまで、情報を一覧表示するアプリ。各クールのアニメのタイトル・サブタイトル・ハッシュタグ・Twitter・公式サイトを一覧に表示します。2014年以降のアニメに対応しております。
        </Typography>
      </Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
};

export default About;
