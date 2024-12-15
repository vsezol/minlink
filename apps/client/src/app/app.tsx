import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ViewerPage from '../pages/viewer-page';
import ShortenerPage from '../pages/shortener-page';
import { RoutePath } from '../shared/lib/router';

const router = createBrowserRouter([
  {
    path: RoutePath.Shortener,
    element: <ShortenerPage />,
  },
  {
    path: RoutePath.Viewer,
    element: <ViewerPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
