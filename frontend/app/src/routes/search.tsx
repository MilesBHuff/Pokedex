import {useAppSelector} from '@/redux/hooks.ts';
import {useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Search = () => {

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
    return (
        <section>
            <h2>Search for "{query}"</h2>
            {matches.length > 0
                ? <ul>{
                    matches.map((match, index) =>
                        <li key={index}>
                            <Link to={`/pokemon?id=${match.id}`}>
                                {match.id} {match.name}
                            </Link>
                        </li>
                    )
                }</ul>
                : <p>No matches!</p>
            }
        </section>
    );
};
