import {Link, useLocation} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
//TODO: Make `Nav` into a breadcrumb, rather than just a tool for debugging.
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
        <nav style={{display: 'none'}}>
            <ul>{
                entries.map((entry, index) =>
                    <li key={index}>{
                        entry.path !== location.pathname
                            ? <Link to={entry.path}>{entry.name}</Link>
                            : <a className="activated">{entry.name}</a>
                    }</li>
                )
            }</ul>
        </nav>
    );
};
