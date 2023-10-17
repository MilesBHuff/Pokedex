import {usePokemonByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
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
export const PokemonInfoCore = (props: {id: number;}) => {
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
            <h2 className="raw-data">#{pokemon.id} {pokemon.name}</h2>
            {pokemon.sprites.front_default ? <img className="pokemon-sprite" src={pokemon.sprites.front_default} /> : null}
            <p>Species: {pokemon.species.name}</p>
        </>}
    </>;
};
