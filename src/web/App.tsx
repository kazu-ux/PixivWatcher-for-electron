import { useState } from 'react';
import './App.css';
import PermanentDrawerLeft from './containers/permanent_drawer';
import Header from './conponents/header';

import { Routes, Route } from 'react-router-dom';
import About from './pages/about';
import Settings from './pages/settings';

import FeedPage from './pages/feed_page';
import Home from './pages/home';

export const App = () => {
  return (
    <div className='container'>
      <PermanentDrawerLeft
        body={
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/feed/*' element={<FeedPage />} />
          </Routes>
        }
      />
    </div>
  );
};
