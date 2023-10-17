import {useAppSelector} from '@/redux/hooks.ts';
import {Fragment, FunctionComponent} from 'react';
import {Link, useLocation} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
//TODO: Make `Nav` into a breadcrumb, rather than just a tool for debugging.
export const Nav: FunctionComponent = () => {
    const location = useLocation();
    const history = useAppSelector(state => state.search.history);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const entries: Array<{
        name: string,
        path: string,
        args?: string,
    }> = [{
        name: 'Home',
        path: '/',
    }, {
        name: 'Search',
        path: '/search',
        args: `?q=${history[0]}`,
    }, {
        name: 'Pokémon',
        path: '/pokemon',
    }];

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <nav>
            <ul>{
                entries.map((entry, index) => <Fragment key={index}>{
                    entry.path !== location.pathname
                        ? <li><Link to={entry.path + (entry.args ?? '')}>{entry.name}</Link></li>
                        : <li className="hide-following"><a className="activated">{entry.name}</a></li>
                }</Fragment>)
            }</ul>
        </nav>
    );
};
