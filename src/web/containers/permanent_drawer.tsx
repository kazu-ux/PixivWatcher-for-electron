import { ReactElement } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { DRAWERWIDTH } from '../consts/const';

import { Button } from '@mui/material';
import MyAccordion from './side_menu/accordion';

interface MainList {
  displayName: string;
  icon: ReactElement;
  url: string;
}

export default function PermanentDrawerLeft(props: { body: JSX.Element }) {
  const list: MainList[] = [
    { displayName: 'ホーム', icon: <HomeIcon />, url: '/' },
    { displayName: '検索', icon: <SearchIcon />, url: '/search' },
    {
      displayName: 'Animelについて',
      icon: <InfoIcon />,
      url: '/about',
    },
    {
      displayName: '設定',
      icon: <SettingsIcon />,
      url: '/settings',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ width: `calc(100% - ${DRAWERWIDTH}px)`, ml: `${DRAWERWIDTH}px` }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Pixiv Watcher
          </Typography>
          <Button color='inherit' onClick={async () => {}}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWERWIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWERWIDTH,
            boxSizing: 'border-box',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <List>
          {list.map((object) => (
            <ListItem key={object.displayName} disablePadding>
              <Link to={object.url}>
                <ListItemButton>
                  <ListItemIcon>{object.icon}</ListItemIcon>
                  <ListItemText primary={object.displayName} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <MyAccordion></MyAccordion>
      </Drawer>
      <Box
        component='main'
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {props.body}
      </Box>
    </Box>
  );
}
