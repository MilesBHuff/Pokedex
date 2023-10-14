import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Nav = () => (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/pokemon">Pokémon</Link></li>
            <li><Link to="/error">404</Link></li>
        </ul>
    </nav>
);
