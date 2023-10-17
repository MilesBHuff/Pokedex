import {urlifyParams} from '@/utilities/urlify-params.function';
import {urlifyPath} from '@/utilities/urlify-path.function';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {NamedAPIResourceList, Pokemon} from 'pokenode-ts';

////////////////////////////////////////////////////////////////////////////////
interface QueryOptions {
    offset?: number | undefined,
    limit?: number | undefined,
}
const defaultOptions: QueryOptions = {
    offset: 0,
    limit: 9999, //NOTE: `Infinity` doesn't work, so I'm using an arbitrarily high number instead.
};

////////////////////////////////////////////////////////////////////////////////
/** A slice that accesses PokéAPI v2.
 *  Documentation can be found here:  https://pokeapi.co/docs/v2.
 *  Types provided by `pokenode-ts`.
**/
export const pokeapiSlice = createApi({
    reducerPath: 'pokeapi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2',
    }),
    endpoints: builder => ({
        pokemonList: builder.query<NamedAPIResourceList, void | QueryOptions>({
            query: (options?: QueryOptions) => '/pokemon' + urlifyParams(options ?? {}),
        }),
        pokemonById: builder.query<Pokemon, number>({
            query: (id, options?: QueryOptions) => '/pokemon' + urlifyPath(id.toString(10)) + urlifyParams(options ?? {}),
        }),
    }),
});

////////////////////////////////////////////////////////////////////////////////
export const {
    usePokemonListQuery,
    usePokemonByIdQuery,
} = pokeapiSlice;
