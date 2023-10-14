import {Footer} from '@/app/divisions/footer';
import {Header} from '@/app/divisions/header';
import {Nav} from '@/app/divisions/nav';
import {Router} from '@/app/router.tsx';

////////////////////////////////////////////////////////////////////////////////
export const App = () => (
    <>
        <Header/>
        <Nav/>
        <Router/>
        <Footer/>
    </>
);
