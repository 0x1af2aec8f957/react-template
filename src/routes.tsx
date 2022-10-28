import { Suspense, lazy } from "react";
// import { Router } from "react-router";

import App from './views/App';

const NotFound = lazy(() => import('./views/NotFound'));
const Home = lazy(() => import('./views/Home'));

export default [
  // These are the same as the props you provide to <Route>
  { 
    path: "/", 
    element: <App />,
    children: [
      {
        path: '',
        element: <Suspense children={<Home />} fallback={<>...</>}/>
      }
    ]
  },
  { path: "/test", element: <>Hello React.Router.Test!</> },
  // Not found routes work as you'd expect
  { path: "*", element: <Suspense children={<NotFound />} fallback={<>...</>}/> }
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
//             path: '',
//             element: <Suspense children={<Home />} fallback={<>...</>}/>
//           }
//         ]
//       },
//       { path: "/test", element: <></> },
//       // Not found routes work as you'd expect
//       // { path: "*", element: <Suspense children={<NotFound />} fallback={<>...</>}/>,
//   ]) 
// }</>
// );