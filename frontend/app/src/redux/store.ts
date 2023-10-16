import {pokeapiSlice} from '@/redux/slices/pokeapi.slice.ts';
import {searchSlice} from '@/redux/slices/search.slice.ts';
import {configureStore} from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////
export const store = configureStore({
    reducer: {
        [pokeapiSlice.reducerPath]: pokeapiSlice.reducer,
        search: searchSlice.reducer,
    },
    middleware: getDefaultMiddleware => (getDefaultMiddleware()
        .concat(pokeapiSlice.middleware)
    ),
});

////////////////////////////////////////////////////////////////////////////////
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
