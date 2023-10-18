import { useEffect, type ReactNode, useRef } from 'react';
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { useRouteError, isRouteErrorResponse, useLocation } from "react-router-dom";

export default ({ error, resetErrorBoundary }: FallbackProps) => {
  // const error = useRouteError();
  const location = useLocation();
  const errorLocation = useRef(location.pathname);

  // if (process.env.NODE_ENV === 'development') console.error('router-error: ', error);
  // if (isRouteErrorResponse(error)) return null;

  useEffect(() => {
    if (location.pathname !== errorLocation.current) { // 重置错误边界
        resetErrorBoundary();
    }
  },[location.pathname])

  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center' }}>应用程序出错，请刷新重试</h1>
      </div>
    </div>
  );
}
