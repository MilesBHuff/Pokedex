import Footer from '@/app/divisions/footer';
import Header from '@/app/divisions/header';
import Nav from '@/app/divisions/nav';

////////////////////////////////////////////////////////////////////////////////
export const App = () => (
    <div id="app">
        <Header/>
        <Nav/>
        {/* <Router/> */}
        <Footer/>
    </div>
);
export default App;
