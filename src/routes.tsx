import { Suspense, lazy, type ReactNode } from "react";
import { useStore } from 'effector-react'
// import { Navigate } from "react-router-dom";

import { $userInfo } from './store/global';
import App from './views/App';

const NotFound = lazy(() => import('./views/NotFound'));
const NotPermission = lazy(() => import('./views/NotPermission'));
const Home = lazy(() => import('./views/Home'));

interface WrapAuthComponentProp {
  children: ReactNode,
  roles?: string | string[],
  fallback?: ReactNode,
}

const WrapAuthComponent = ({ // 路由鉴权
  children,
  roles = '*',
  fallback = (<>...</>)
}: WrapAuthComponentProp) => {
  const userInfo = useStore($userInfo);
  const authComponent = (<Suspense children={children} fallback={fallback} />);

  if (roles === '*') return authComponent; // 通配
  if (roles.includes(userInfo.role)) return authComponent; // 特定权限
  // return (<Navigate to="/403" replace/>);
  return (<Suspense children={<NotPermission />} fallback={fallback} />);
}

export default [
  // These are the same as the props you provide to <Route>
  { 
    path: "/", 
    element: <App />,
    children: [
      {
        path: '',
        element: <WrapAuthComponent children={<Home />} />
      }
    ]
  },
  { path: "/test", element: <>Hello React.Router.Test!</> },
  // Not found routes work as you'd expect
  { path: "*", element: <WrapAuthComponent children={<NotFound />} roles="*" /> }
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
//             element: <WrapAuthComponent children={<Home />} />
//           }
//         ]
//       },
//       { path: "/test", element: <></> },
//       // Not found routes work as you'd expect
//       // { path: "*", element: <WrapAuthComponent children={<NotFound />} />,
//   ]) 
// }</>
// );