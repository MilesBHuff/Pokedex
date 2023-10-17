import {Footer} from '@/layout/footer';
import {Header} from '@/layout/header';
import {Nav} from '@/layout/nav';
import {ReactError} from '@/views/react-error';
import {FunctionComponent} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Outlet} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Root: FunctionComponent = () => <>
    <Header />
    <Nav />

    <ErrorBoundary fallbackRender={ReactError}>
        <Outlet />
    </ErrorBoundary>

    <Footer />
</>;
