import {createSlice} from '@reduxjs/toolkit';
import {
    // ContestClient,
    // EncounterClient,
    // EvolutionClient,
    // GameClient,
    // LocationClient,
    // MachineClient,
    // MainClient,
    // MoveClient,
    PokemonClient,
    // UtilityClient,
} from 'pokenode-ts';

////////////////////////////////////////////////////////////////////////////////
/** For the time-being, this "slice" just holds copies of the various and sundry clients that exist in the PokéAPI.
 *  It is not yet properly integrated into Redux, meaning that it is not yet state-aware.
 *  This *should* be fine for my current use-case, but mightn't be in a situation where many disparate parts of the app depend on the same calls, since this situation could result in some parts of the app displaying old data while others display new data.
 *  I'm unsure of how the clients themselves handle receiving multiple concurrent requests, but seeing as they do handle their own caching, it seems reasonable that they would also be designed to handle this such a situation.
 *  Unused clients are commented;  simply uncomment them to use them.
**/
export const pokeapiSlice = createSlice({
    name: 'pokeapi',
    initialState: {
        // contestClient: new ContestClient(),
        // encounterClient: new EncounterClient(),
        // evolutionClient: new EvolutionClient(),
        // gameClient: new GameClient(),
        // locationClient: new LocationClient(),
        // machineClient: new MachineClient(),
        // mainClient: new MainClient(),
        // moveClient: new MoveClient(),
        pokemonClient: new PokemonClient(),
        // utilityClient: new UtilityClient(),
    },
    reducers: {
        //TODO: Wrap the above in reducers or something so that Redux handles their states.
    },
});
