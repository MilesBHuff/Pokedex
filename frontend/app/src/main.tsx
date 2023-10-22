import {store} from '@/redux/store';
import {routes} from '@/routes.tsx';
import {SpinnerComponent} from '@/widgets/spinner.component.tsx';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import './styles/_.scss';

////////////////////////////////////////////////////////////////////////////////
try {
    const router = createBrowserRouter(routes);

    const root = document.getElementById('root');
    if(!root) throw new ReferenceError('No root element!');

    ReactDOM.createRoot(root).render(
        <StrictMode>
            <Provider store={store}>
                <RouterProvider router={router} fallbackElement={<SpinnerComponent />} />
            </Provider>
        </StrictMode>,
    );
} catch(error) {
    console.error(error);
}
