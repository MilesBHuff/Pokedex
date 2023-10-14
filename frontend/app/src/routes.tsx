import {Root} from '@/root.tsx';
import {Home} from '@/routes/home.tsx';
import {Pokemon} from '@/routes/pokemon.tsx';
import {redirect} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const routes = [{
    path: '/',
    element: <Root />,
    children: [{
        path: '',
        element: <Home />,
    }, {
        path: 'pokemon',
        element: <Pokemon />,
    }, {
        path: '*',
        loader: async () => redirect('/'),
    }],
}];
