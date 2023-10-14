import {Footer} from '@/app/divisions/footer';
import {Header} from '@/app/divisions/header';
import {Nav} from '@/app/divisions/nav';
import {Outlet} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Root = () => <>
    <Header/>
    <Nav/>
    <Outlet/>
    <Footer/>
</>;
