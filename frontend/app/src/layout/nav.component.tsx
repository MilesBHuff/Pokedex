import {useAppSelector} from '@/redux/hooks.ts';
import {selectHistory} from '@/redux/slices/search.slice.ts';
import type {FunctionComponent} from 'react';
import {Fragment} from 'react';
import {Link, useLocation} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const NavComponent: FunctionComponent = () => {
    const location = useLocation();
    const history = useAppSelector(selectHistory);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const entries: Array<{
        name: string,
        path: string,
        args?: string,
        show?: boolean,
    }> = [{
        name: 'Home',
        path: '/',
    }, {
        name: 'Search',
        path: '/search',
        args: `?q=${history[0]}`,
        show: !!history[0],
    }, {
        name: 'Pokémon',
        path: '/pokemon',
        // args: `?id=`,
        show: '/pokemon' === location.pathname,
    }];

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <nav id="nav">
            <ul>{
                entries.map(entry => <Fragment key={entry.path}>
                    {entry.show === false ? (
                        null
                    ) : entry.path !== location.pathname ? (
                        <li><Link to={entry.path + (entry.args ?? '')}>{entry.name}</Link></li>
                    ) : (
                        <li><a className="activated">{entry.name}</a></li>
                    )}
                </Fragment>)
            }</ul>
        </nav>
    );
};
