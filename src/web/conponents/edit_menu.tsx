import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useAtom } from 'jotai';
import { watchWorksAtom } from '../atoms/atom';
import { WatchWork } from '../types/type';

export default function EditMenu(props: WatchWork) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [watchWorks, setWatchWorks] = useAtom(watchWorksAtom);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = async () => {
    /*     const newWatchWorks = watchWorks.filter(
      (watchWork) => watchWork.displayName !== props.displayName
    );
    setWatchWorks(newWatchWorks);
    setAnchorEl(null); */
  };

  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleMenuItemClick}>編集</MenuItem>
        <MenuItem onClick={handleMenuItemClick}>削除</MenuItem>
      </Menu>
    </div>
  );
}
