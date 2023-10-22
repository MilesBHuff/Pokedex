import {FooterComponent} from '@/layout/footer.component.tsx';
import {HeaderComponent} from '@/layout/header.component.tsx';
import {NavComponent} from '@/layout/nav.component.tsx';
import {ReactErrorComponent} from '@/views/react-error.component.tsx';
import type {FunctionComponent} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Outlet} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Root: FunctionComponent = () => <>

    <section className="top">
        <HeaderComponent />
        <NavComponent />
    </section>

    <section className="center">
        <ErrorBoundary fallbackRender={ReactErrorComponent}>
            <Outlet />
        </ErrorBoundary>
    </section>

    <section className="bottom">
        <FooterComponent />
    </section>
</>;
