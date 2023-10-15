import {searchSlice} from '@/redux/slices/search.slice.ts';
import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////
export const store = configureStore({
    reducer: {
        search: searchSlice.reducer,
    },
});

////////////////////////////////////////////////////////////////////////////////
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
