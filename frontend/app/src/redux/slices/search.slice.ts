import {PayloadAction, createSlice} from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////
/** The maximum number of search terms to remember. */
const maxHistory = 6;

////////////////////////////////////////////////////////////////////////////////
export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        /** A FIFO queue containing a history of search terms.
         *  Limited in length to the value of `maxHistory`.
         *  The queue is sorted in order from most-recent to least-recent.
        **/
        history: [] as Array<string>,
    },
    reducers: {
        /** Add a term to search history. */
        addToHistory: (state, action: PayloadAction<string>): void => {
            state.history.unshift(action.payload);
            if(state.history.length > maxHistory) state.history.pop();
        },
    },
});
