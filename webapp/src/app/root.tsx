import {Footer} from '@/app/layout/footer';
import {Header} from '@/app/layout/header';
import {Nav} from '@/app/layout/nav';
import {Outlet} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Root = () => <>
    <Header/>
    <Nav/>
    <Outlet/>
    <Footer/>
</>;
