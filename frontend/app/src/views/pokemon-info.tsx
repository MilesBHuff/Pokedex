import {usePokemonByIdQuery, useSpeciesByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {displayifyName} from '@/utilities/displayify-name.function';
import {getIdFromUrl} from '@/utilities/get-id-from-url.function.ts';
import {EvolutionsViewer} from '@/widgets/evolutions-viewer.tsx';
import {PokemonTypes} from '@/widgets/pokemon-types.tsx';
import {Spinner} from '@/widgets/spinner.tsx';
import {Fragment, FunctionComponent, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const PokemonInfo: FunctionComponent = () => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [searchParams] = useSearchParams();
    /** The Pokémon's National 'Dex Number */
    const [id, setId] = useState(undefined as number | undefined);

    /** Get and validate Pokémon ID */
    const parseId = (): void => {
        let newId = parseInt(searchParams.get('id') ?? '');
        if(newId <= 0 || newId >= Infinity) newId = NaN;
        setId(newId);
    };
    useEffect(parseId, [searchParams]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <div id="pokemon-info" className="view">
            {id === undefined ? <>
                <h2>Loading...</h2>
                <Spinner />
            </> : <>
                <PokemonInfoCore id={id} />
            </>}
        </div>
    );
};

////////////////////////////////////////////////////////////////////////////////
export const PokemonInfoCore: FunctionComponent<{id: number}> = props => {
    const {data: pokemon, error: pokemonError, isLoading: pokemonLoading} = usePokemonByIdQuery(props.id);
    // useEffect(() => console.debug(pokemon), [pokemon]);
    const {data: species, isLoading: speciesLoading} = useSpeciesByIdQuery(props.id);
    // useEffect(() => console.debug(species), [species]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {pokemonLoading || speciesLoading ? <>
            <h2>Loading...</h2>
            <Spinner />
        </> : pokemonError ? <>
            <h2>Pokémon #{props.id}</h2>
            <p className="error">Failed to load data!</p>
            <p>Did you enter a valid Pokédex index?</p>
        </> : !pokemon ? <>
            <h2>Pokémon #{props.id}</h2>
            <p>No data!</p>
        </> : <>
            <h2>{displayifyName(pokemon.name)} (#{pokemon.id})</h2>
            <ul>
                {pokemon.name === species?.name ? null :
                    <li><strong>Species: </strong>
                        {displayifyName(pokemon.species.name)}
                    </li>
                }
                {!species ? null :
                    <li><strong>Evolution Tree: </strong>
                        <EvolutionsViewer evolutionId={getIdFromUrl(species.evolution_chain.url)} pokemonId={species.id}/>
                        {/* TODO: Hide if no evolutions. */}
                    </li>
                }
                <li>{pokemon.sprites.front_default ? <img className="pokemon-sprite" src={pokemon.sprites.front_default} /> : null}</li>
                <li><strong>Types: </strong>
                    <PokemonTypes types={pokemon.types} />
                </li>
                <li><strong>Abilities: </strong>
                    {[...pokemon.abilities].sort((a, b) => a.ability.name.localeCompare(b.ability.name)).map((ability, index) => <Fragment key={index}>
                        {displayifyName(ability.ability.name)}
                        {index < pokemon.abilities.length - 1 ? ', ' : ''}
                        {index === pokemon.abilities.length - 1 && pokemon.abilities.length > 1 ? '.' : ''}
                    </Fragment>)}
                </li>
                <li><strong>Moves: </strong>
                    {[...pokemon.moves].sort((a, b) => a.move.name.localeCompare(b.move.name)).map((move, index) => <Fragment key={index}>
                        {displayifyName(move.move.name)}
                        {index < pokemon.moves.length - 1 ? ', ' : ''}
                        {index === pokemon.moves.length - 1 && pokemon.moves.length > 1 ? '.' : ''}
                    </Fragment>)}
                </li>
            </ul>
        </>}
    </>;
};
