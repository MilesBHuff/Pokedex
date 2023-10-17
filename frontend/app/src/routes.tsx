import {Root} from '@/root.tsx';
import {Home} from '@/views/home';
import {PokemonInfo} from '@/views/pokemon-info';
import {SearchResults} from '@/views/search-results';
import {redirect} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const routes = [{ //TODO: Find type for `routes`.
    path: '/',
    element: <Root />,
    children: [{
        path: '',
        element: <Home />,
    }, {
        path: 'search',
        element: <SearchResults />,
    }, {
        path: 'pokemon',
        element: <PokemonInfo />,
    }, {
        path: '*',
        loader: async () => redirect('/'),
    }],
}];
