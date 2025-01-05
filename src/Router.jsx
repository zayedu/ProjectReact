import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '@/pages/HomePage';
import ListingDetailsPage from '@/pages/ListingDetailsPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ListingFavoritesPage from '@/pages/ListingFavoritesPage';

import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: '/listings/:listingId',
    element: <ListingDetailsPage />,
  },
  {
    path: '/favorites',
    element: <ListingFavoritesPage />,
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
