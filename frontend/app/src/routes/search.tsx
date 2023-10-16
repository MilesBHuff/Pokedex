import {useAppSelector} from '@/redux/hooks.ts';
import {MouseEventHandler, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Search = () => {
    const navigate = useNavigate();

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    // Get and validate search parameter
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const queryRegex = new RegExp(query, 'i');

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** A type that distills down the information we get from `PokemonClient().listPokemons`. */

    type basicPokemonInfo = {
        id: number,
        name: string,
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    // Get a list of all Pokémon, and see if there are any matches

    const pokeapi = useAppSelector(state => state.pokeapi);
    const [pokemons, setPokemons] = useState([] as Array<basicPokemonInfo>);
    const [matches, setMatches] = useState([] as Array<basicPokemonInfo>);

    if(pokemons.length === 0) {
        pokeapi.pokemonClient.listPokemons(0, 9999)
            .then(response => {
                console.debug(response);

                // Parse out and save a list of all Pokémon with a National 'Dex number
                const newPokemons: Array<basicPokemonInfo> = [];
                for(const pokemon of response.results) {
                    const id = parseInt(pokemon.url.replace(/^.*\/(\d+)\//, '$1'));
                    if(id < 10000) { // IDs greater than `10000` are not real Pokémon IDs.
                        newPokemons.push({
                            id: id,
                            name: pokemon.name,
                        });
                    }
                }
                setPokemons(newPokemons);

                // See if the search query matches any Pokémon
                const newMatches: Array<basicPokemonInfo> = [];
                for(const newPokemon of newPokemons) {
                    if((newPokemon.name.match(queryRegex)?.length ?? NaN) > 0) {
                        newMatches.push(newPokemon);
                    }
                }
                setMatches(newMatches);
            });
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
        <section>
            <h2>Search for "{query}"</h2>
            {matches.length > 0
                ? <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>{
                        matches.map(match =>
                            <tr key={match.id} id={match.id.toString(10)} onClick={handleRowClick}>
                                <td>{match.id}</td>
                                <td>{match.name}</td>
                            </tr>
                        )
                    }</tbody>
                </table>
                : <p>No matches!</p>
            }
        </section>
    );
};
