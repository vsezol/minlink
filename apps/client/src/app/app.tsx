import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UrlRedirect from './url-redirect';
import UrlShortener from './url-shortener';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UrlShortener />,
  },
  {
    path: ':shortId',
    element: <UrlRedirect />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
