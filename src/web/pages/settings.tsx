import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Snackbar,
  SnackbarOrigin,
  Stack,
  Switch,
  Typography,
  styled,
} from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from 'react';

interface State extends SnackbarOrigin {
  open: boolean;
}

const Settings = () => {
  const [state, setState] = useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    margin: theme.spacing(1),
    textAlign: 'center',

    color: theme.palette.text.secondary,
  }));

  const { vertical, horizontal, open } = state;

  const handleClick = () => {
    setState({ open: true, vertical: 'top', horizontal: 'right' });
  };

  const handleClose = () => {
    setState({ open: false, vertical: 'top', horizontal: 'right' });
  };

  <List>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary='Inbox' />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary='Drafts' />
      </ListItemButton>
    </ListItem>
  </List>;

  return (
    <Box>
      <FormControl component='fieldset' fullWidth>
        <FormLabel component='legend'>Label placement</FormLabel>
        <FormGroup aria-label='position'>
          <Item>
            <Stack
              direction='row'
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <NotificationsActiveIcon />
              <FormControlLabel
                control={
                  <Switch
                    checked={open}
                    onChange={handleClick}
                    name='checkedB'
                    color='primary'
                  />
                }
                label='通知を出す'
                labelPlacement='start'
              />
            </Stack>
          </Item>

          <FormControlLabel
            control={
              <Switch
                // checked={true}
                onChange={() => {}}
                name='checkedB'
                color='primary'
              />
            }
            label='Right'
          />
          <FormControlLabel
            control={
              <Switch
                checked={true}
                onChange={() => {}}
                name='checkedB'
                color='primary'
              />
            }
            label='Top'
          />
          <FormControlLabel
            control={
              <Switch
                checked={true}
                onChange={() => {}}
                name='checkedB'
                color='primary'
              />
            }
            label='Bottom'
          />
        </FormGroup>
      </FormControl>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message='テスト'
        autoHideDuration={3000}
      ></Snackbar>
    </Box>
  );
};

export default Settings;
