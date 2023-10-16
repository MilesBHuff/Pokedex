import {usePokemonQuery} from '@/redux/slices/pokeapi.slice.ts';
import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {Spinner} from '@/widgets/spinner.tsx';
import {MouseEventHandler, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Search = () => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    // Hooks
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const {data: pokemonData, error: pokemonError, isLoading: pokemonLoading} = usePokemonQuery();

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    // Get and validate search parameter
    const query = searchParams.get('q') ?? '';
    const queryRegex = new RegExp(query, 'i');
    //TODO: Validate.

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    // Go through the list of all Pokémon, and see if there are any matches
    const matches: Array<BasicPokemonInfo> = [];
    const pokemons: Array<BasicPokemonInfo> = [];
    if(pokemonData) {

        // Parse out and save a list of all Pokémon with a National 'Dex number
        for(const pokemon of pokemonData.results) {
            const id = parseInt(pokemon.url.replace(/^.*\/(\d+)\//, '$1'));
            if(id < 10000) { // IDs greater than `10000` are not real Pokémon IDs.
                pokemons.push({
                    id: id,
                    name: pokemon.name,
                });
            }
        }

        // See if the search query matches any Pokémon
        for(const pokemon of pokemons) {
            if((pokemon.name.match(queryRegex)?.length ?? NaN) > 0) {
                matches.push(pokemon);
            }
        }
    }

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** If the row has an ID, then clicking it should take us to the info page about that ID. */
    const handleRowClick: MouseEventHandler<HTMLTableRowElement> = event => {
        let target = '';

        const attributes = event.currentTarget.attributes;
        for(const attribute of attributes) {
            if(attribute.name === 'id') target = attribute.value;
        }

        if(target) navigate(`/pokemon?id=${target}`);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <section id="search">
            <h2>Search for "{query}"</h2>

            {pokemonLoading ? (
                <Spinner />
            ) : pokemonError || !pokemonData ? (
                <p className="error">Failed to load data!</p>
            ) : matches.length <= 0 ? (
                <p>No matches!</p>
            ) : (
                <table className="search-results">
                    <thead>
                        <tr>
                            <th className="id">ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map(match =>
                            <tr key={match.id} id={match.id.toString(10)} onClick={handleRowClick}>
                                <td className="raw-data id">{match.id}</td>
                                <td className="raw-data">{match.name}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </section>
    );
};
