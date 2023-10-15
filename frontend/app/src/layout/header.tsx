import {SearchBar} from '@/widgets/search-bar';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Header = () => (
    <header>
        <div className="brandmark">
            <img src="/favicon.svg"/>
            <h1><Link to="/">Unofficial Pokédex</Link></h1>
        </div>
        <SearchBar />
    </header>
);
