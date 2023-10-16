import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {PokemonClient} from 'pokenode-ts';

////////////////////////////////////////////////////////////////////////////////
export const pokeapiSlice = createSlice({
    name: 'pokeapi',
    initialState: {
        pokemon: new PokemonClient(),
    },
    reducers: {
        /** Add a term to search history. */
        pokemonClient: (state, action: PayloadAction<string>): void => {
            //TODO
        },
    },
});
