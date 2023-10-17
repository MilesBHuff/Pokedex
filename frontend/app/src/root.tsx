import {Footer} from '@/layout/footer';
import {Header} from '@/layout/header';
import {ReactError} from '@/routes/react-error';
import {Nav} from '@/layout/nav';
import {ErrorBoundary} from 'react-error-boundary';
import {Outlet} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Root = () => <>
    <Header />
    <Nav />

    <ErrorBoundary fallbackRender={ReactError}>
        <Outlet />
    </ErrorBoundary>

    <Footer />
</>;
