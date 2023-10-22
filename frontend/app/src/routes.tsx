import {Root} from '@/root.tsx';
import {HomeComponent} from '@/views/home.component.tsx';
import {PokemonInfoComponent} from '@/views/pokemon-info.component.tsx';
import {SearchResultsComponent} from '@/views/search-results.component.tsx';
import {redirect} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const routes = [{ //TODO: Find type for `routes`.
    path: '/',
    element: <Root />,
    children: [{
        path: '',
        element: <HomeComponent />,
    }, {
        path: 'search',
        element: <SearchResultsComponent />,
    }, {
        path: 'pokemon',
        element: <PokemonInfoComponent />,
    }, {
        path: '*',
        loader: async () => redirect('/'),
    }],
}];
