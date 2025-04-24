import { useRoutes } from 'react-router-dom'
import Layout from './ui/components/Layout'
import NotFound from './ui/components/NotFound'
import Home from './pages/Home'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  },
];

const Routers = () => useRoutes(routes);

export default Routers