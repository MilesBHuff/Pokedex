import {Root} from '@/root.tsx';
import {Home} from '@/routes/home.tsx';
import {PokemonInfo} from '@/routes/pokemon-info';
import {SearchResults} from '@/routes/search-results';
import {redirect} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const routes = [{
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
