import {useAppSelector} from '@/redux/hooks.ts';
import {Fragment, FunctionComponent} from 'react';
import {Link, useLocation} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Nav: FunctionComponent = () => {
    const location = useLocation();
    const history = useAppSelector(state => state.search.history);

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
        <nav>
            <ul>{
                entries.map((entry, index) => <Fragment key={index}>
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
