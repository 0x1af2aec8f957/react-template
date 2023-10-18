import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";

import CustomErrorBoundary from './ErrorBoundary';

export default (props: any) => (
        <>
                <h1 style={{ textAlign: 'center' }}>Hello React.App!</h1>
                <ErrorBoundary FallbackComponent={CustomErrorBoundary}>
                    <Outlet />
                </ErrorBoundary>
        </>
);