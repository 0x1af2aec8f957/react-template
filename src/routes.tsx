import { useEffect, Suspense, lazy } from "react";
// import { Router } from "react-router";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useRoutes,
  useNavigate
} from "react-router-dom";

import App from './views/App';

const Home = lazy(() => import('./views/Home'));

export default [
  // These are the same as the props you provide to <Route>
  { 
    path: "/", 
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Suspense children={<Home />} />
      }
    ]
  },
  { path: "/test", element: <>Hello React.Router.Test!</> },
  // Not found routes work as you'd expect
  // { path: "*", element: <NotFound /> },
]

// export default () => (
// <>{ 
//   useRoutes([
//       // These are the same as the props you provide to <Route>
//       { 
//         path: "/", 
//         element: <App />,
//         children: [
//           {
//             path: 'home',
//             element: <Suspense children={<Home />} />
//           }
//         ]
//       },
//       { path: "/test", element: <></> },
//       // Not found routes work as you'd expect
//       // { path: "*", element: <NotFound /> },
//   ]) 
// }</>
// );