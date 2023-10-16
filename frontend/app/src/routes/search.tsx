import {useAppSelector} from '@/redux/hooks.ts';
import {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Search = () => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    // Get and validate search parameter
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const navigate = useNavigate();
    if(!query) {
        navigate('/');
        return null;
    }
    const queryRegex = new RegExp(query, 'i');

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const pokeapi = useAppSelector(state => state.pokeapi);
    const [pokemons, setPokemons] = useState([] as Array<string>);
    const [matches, setMatches] = useState([] as Array<string>);

    if(pokemons.length === 0) {
        pokeapi.pokemonClient.listPokemons(0, 9999)
            .then(response => {

                // Parse out and save a list of all Pokémon names
                const newPokemons: Array<string> = [];
                for(const pokemon of response.results) {
                    newPokemons.push(pokemon.name);
                }
                setPokemons(newPokemons);

                // See if the search query matches any Pokémon
                const newMatches: Array<string> = [];
                for(const newPokemon of newPokemons) {
                    if((newPokemon.match(queryRegex)?.length ?? NaN) > 0) {
                        newMatches.push(newPokemon);
                    }
                }
                setMatches(newMatches);
            })
    }
    console.debug(pokemons, matches)

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <section>
            <h2>Search for "{query}"</h2>
            {matches.length > 0
                ? <ul>{
                    matches.map((match, index) => 
                        <li key={index}>{match}</li>
                    )
                }</ul>
                : <p>No matches!</p>
            }
        </section>
    );
};
