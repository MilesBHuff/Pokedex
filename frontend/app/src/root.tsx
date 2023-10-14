import {Footer} from '@/layout/footer';
import {Header} from '@/layout/header';
import {Nav} from '@/layout/nav';
import {Outlet} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Root = () => <>
    <Header/>
    <Nav/>
    <Outlet/>
    <Footer/>
</>;
