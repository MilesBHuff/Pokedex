import {PayloadAction, Selector, createSlice} from '@reduxjs/toolkit';

////////////////////////////////////////////////////////////////////////////////
/** The maximum number of search terms to remember. */
const maxHistory = 4; // 4 is the limit of the human subitization range.

////////////////////////////////////////////////////////////////////////////////
const initialState = {
    /** A FIFO queue containing a history of search terms.
     *  Limited in length to the value of `maxHistory`.
     *  The queue is sorted in order from most-recent to least-recent.
    **/
    history: [] as Array<string>,
};

////////////////////////////////////////////////////////////////////////////////
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        /** Add a term to search history. */
        addHistory: (state, action: PayloadAction<string>): void => {

            // If the new entry is already in the history, move it to the top.
            for(let i = 0; i < state.history.length; i++) {
                if(state.history[i] === action.payload) {
                    state.history.splice(i, 1);
                    state.history.unshift(action.payload);
                    return;
                }
            }

            // Else, add the new entry, removing the oldest one as needed.
            state.history.unshift(action.payload);
            if(state.history.length > maxHistory) state.history.pop();
        },
    },
});

////////////////////////////////////////////////////////////////////////////////
export const selectHistory: Selector<
    {[searchSlice.name]: typeof initialState},
    Array<string>
> = state => (
    state[searchSlice.name].history
);
