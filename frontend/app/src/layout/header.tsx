import {SearchBar} from '@/widgets/search-bar';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Header = () => (
    <header>
        <h1><Link to="/">Unofficial Pokédex</Link></h1>
        <SearchBar />
    </header>
);
