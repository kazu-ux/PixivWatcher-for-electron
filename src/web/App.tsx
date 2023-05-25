import './App.css';
import PermanentDrawerLeft from './containers/permanent_drawer/permanent_drawer';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import About from './pages/about';
import Settings from './pages/settings';

import FeedPage from './pages/feed_page';
import Home from './pages/home';

const router = createHashRouter([
  {
    path: '/',
    element: <PermanentDrawerLeft />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'settings', element: <Settings /> },
      { path: '/feed/*', element: <FeedPage /> },
    ],
  },
]);

export const App = () => {
  return (
    <div className='container'>
      <RouterProvider router={router} />
    </div>
  );
};
