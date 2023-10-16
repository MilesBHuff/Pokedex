import {Footer} from '@/layout/footer';
import {Header} from '@/layout/header';
import {Nav} from '@/layout/nav';
import {Outlet} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Root = () => <>
    <Header />
    {/* <Nav /> */}{/* TODO: Make `Nav` into a breadcrumb, rather than just a tool for debugging. */}
    <Outlet />
    <Footer />
</>;
