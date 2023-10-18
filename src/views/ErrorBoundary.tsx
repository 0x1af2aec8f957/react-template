import type { ReactNode } from 'react';
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default (props: {
  children?: ReactNode;
}) => {
  // const error = useRouteError();

  return /* isRouteErrorResponse(error) ? */ (
    <div>
      <div>
        <h1 style={{ textAlign: 'center' }}>应用程序出错，请刷新重试</h1>
      </div>
    </div>
  )/* : (<>
    { props.children }
  </>) */;
}
