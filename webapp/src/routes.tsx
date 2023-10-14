import {Root} from '@/app/root.tsx';
import {Home} from '@/app/routes/home.tsx';
import {Pokemon} from '@/app/routes/pokemon.tsx';
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
