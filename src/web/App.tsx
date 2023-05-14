import { useState } from 'react';
import './App.css';
import PermanentDrawerLeft from './containers/permanent_drawer';
import Header from './conponents/header';

import { Stack } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Settings from './pages/settings';
import IllustList from './containers/illust_list';
import SearchForm from './containers/search_form/search_form';
import SaveButton from './conponents/save_button';
import { DRAWERWIDTH } from './consts/const';
import FeedPage from './pages/feed_page';

export const App = () => {
  return (
    <div className='container'>
      <PermanentDrawerLeft
        body={
          <Routes>
            <Route
              path='/'
              element={
                <Stack
                  direction='column'
                  justifyContent='center'
                  alignItems='center'
                  spacing={2}
                  sx={{
                    width: `calc(100% - ${DRAWERWIDTH}px)`,
                    ml: `${DRAWERWIDTH}px`,
                  }}
                >
                  <SearchForm></SearchForm>
                  <SaveButton></SaveButton>
                  <IllustList></IllustList>
                </Stack>
              }
            />
            <Route path='/about' element={<About />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/feed' element={<FeedPage />} />
          </Routes>
        }
      />
    </div>
  );
};
