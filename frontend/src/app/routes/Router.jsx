import { createBrowserRouter } from 'react-router-dom';
import ROUTES from './routes.data';

import {
  Home, Login, NotFound, Signup,
} from '../../pages';
import { Layout, PrivateOutlet } from '../../layouts';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <Signup />,
      },
      {
        path: ROUTES.HOME,
        element: <PrivateOutlet />,
        children: [
          {
            path: ROUTES.HOME,
            element: <Home />,
          },
        ],
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
