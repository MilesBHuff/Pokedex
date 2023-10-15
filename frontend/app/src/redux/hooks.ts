import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {AppDispatch, RootState} from './store';

////////////////////////////////////////////////////////////////////////////////
/** A version of `useDispatch` that is typed specially for this application. */
export const useAppDispatch: () => AppDispatch = useDispatch;

////////////////////////////////////////////////////////////////////////////////
/** A version of `useSelector` that is typed specially for this application. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
