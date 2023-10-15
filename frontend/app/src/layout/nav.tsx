import {Link, useLocation} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Nav = () => {
    const location = useLocation();

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const entries: Array<{
        name: string,
        path: string,
    }> = [{
        name: 'Home',
        path: '/',
    }, {
        name: 'Search',
        path: '/search',
    }, {
        name: 'Pokémon',
        path: '/pokemon',
    }, {
        name: '404',
        path: '/error',
    }];

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <nav>
            <ul>{
                entries.map(entry =>
                    <li key={entry.path}>{
                        entry.path !== location.pathname
                            ? <Link to={entry.path}>{entry.name}</Link>
                            : <a className="activated">{entry.name}</a>
                    }</li>
                )
            }</ul>
        </nav>
    );
};
