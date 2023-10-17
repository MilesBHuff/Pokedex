import {Footer} from '@/layout/footer';
import {Header} from '@/layout/header';
import {Nav} from '@/layout/nav';
import {ReactError} from '@/views/react-error';
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
