import {useAppDispatch} from '@/redux/hooks.ts';
import {useSpeciesListQuery} from '@/redux/slices/pokeapi.slice.ts';
import {searchSlice} from '@/redux/slices/search.slice.ts';
import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {displayifyName} from '@/utilities/displayify-name.function';
import {urlToId} from '@/utilities/url-to-id';
import {Spinner} from '@/widgets/spinner.tsx';
import {FunctionComponent, MouseEventHandler, useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const SearchResults: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState('');

    /** Get and validate search parameter */
    const parseQuery = (): void => {
        const newQuery = searchParams.get('q') ?? '';
        setQuery(newQuery);
        if(!newQuery || newQuery === 'undefined') navigate('/'); //NOTE:  Only checking for `undefined` here;  `null` is a legitimate query with legitimate results.  `undefined` is a useless query that happens by default when there is no history to go back to.
        else dispatch(searchSlice.actions.addHistory(newQuery));
    };
    useEffect(parseQuery, [searchParams]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const {data: pokemonsData, error: pokemonsError, isFetching: pokemonsLoading} = useSpeciesListQuery({offset: 0, limit: 9999}); //NOTE: `Infinity` doesn't work, so I'm using an arbitrarily high number instead.
    // useEffect(() => console.debug(pokemonsData), [pokemonsData]);
    const [pokemons, setPokemons] = useState([] as Array<BasicPokemonInfo>);

    /** Get, parse, and save a list of all Pokémon that have a National 'Dex number. */
    const parseRawPokemons = (): void => {
        if(!pokemonsData) return;
        const newPokemons: Array<BasicPokemonInfo> = [];

        for(const pokemon of pokemonsData.results) {

            const id = urlToId(pokemon.url);
            if(id < 10000) { // IDs greater than `10000` are not real Pokémon IDs.

                newPokemons.push({
                    id: id,
                    name: pokemon.name,
                });
            }
        }
        setPokemons(newPokemons);
    };
    useEffect(parseRawPokemons, [pokemonsData]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [matches, setMatches] = useState([] as Array<BasicPokemonInfo>);

    /** See if the search query matches any Pokémon */
    const findMatches = (): void => {
        const newMatches: Array<BasicPokemonInfo> = [];
        for(const pokemon of pokemons) {
            if((pokemon.name.match(new RegExp(query, 'i'))?.length ?? NaN) > 0) {
                newMatches.push(pokemon);
            }
        }
        setMatches(newMatches);
    };
    useEffect(findMatches, [query, pokemons]);

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
        <div id="search-results" className="view">
            <h2>Search for "{query}"</h2>

            {pokemonsLoading ? (
                <Spinner />
            ) : pokemonsError ? (
                <p className="error">Failed to load data!</p>
            ) : !pokemonsData ? (
                <p>No data!</p>
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
                                <td>{displayifyName(match.name)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};
