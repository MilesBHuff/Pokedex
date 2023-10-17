import {usePokemonByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {displayifyName} from '@/utilities/displayify-name.function';
import {PokemonTypes} from '@/widgets/pokemon-types.tsx';
import {Spinner} from '@/widgets/spinner.tsx';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const PokemonInfo = () => {

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
        <section id="pokemon-info">
            {id === undefined ? <>
                <h2>Loading...</h2>
                <Spinner />
            </> : <>
                <PokemonInfoCore id={id} />
            </>}
        </section>
    );
};

////////////////////////////////////////////////////////////////////////////////
export const PokemonInfoCore = (props: {id: number}) => {
    const {data: pokemon, error, isLoading: loading} = usePokemonByIdQuery(props.id);
    console.debug(pokemon);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {loading ? <>
            <h2>Loading...</h2>
            <Spinner />
        </> : error ? <>
            <h2>Pokémon #{props.id}</h2>
            <p className="error">Failed to load data!</p>
            <p>Did you enter a valid Pokédex index?</p>
        </> : !pokemon ? <>
            <h2>Pokémon #{props.id}</h2>
            <p>No data!</p>
        </> : <>
            <h2>{displayifyName(pokemon.name)} <span>(#{pokemon.id})</span></h2>
            <ul>
                {pokemon.name === pokemon.species.name ? null : <li><strong>Species: </strong><span>{displayifyName(pokemon.species.name)}</span></li>}
                <li>{pokemon.sprites.front_default ? <img className="pokemon-sprite" src={pokemon.sprites.front_default} /> : null}</li>
                <li><strong>Types: </strong><PokemonTypes types={pokemon.types} /></li>
                <li><strong>Abilities: </strong>
                    {[...pokemon.abilities].sort((a, b) => a.ability.name.localeCompare(b.ability.name)).map((ability, index) => <>
                        <span key={index}>{displayifyName(ability.ability.name)}</span>
                        {index < pokemon.abilities.length - 1 ? ', ' : ''}
                        {index === pokemon.abilities.length - 1 && pokemon.abilities.length > 1 ? '.' : ''}
                    </>)}
                </li>
                <li><strong>Moves: </strong>
                    {[...pokemon.moves].sort((a, b) => a.move.name.localeCompare(b.move.name)).map((move, index) => <>
                        <span key={index}>{displayifyName(move.move.name)}</span>
                        {index < pokemon.moves.length - 1 ? ', ' : ''}
                        {index === pokemon.moves.length - 1 && pokemon.abilities.length > 1 ? '.' : ''}
                    </>)}
                </li>
            </ul>
        </>}
    </>;
};
