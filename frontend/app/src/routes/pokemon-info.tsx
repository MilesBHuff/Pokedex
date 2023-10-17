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
    const {data: pokemonData, error: pokemonError, isLoading: pokemonLoading} = usePokemonByIdQuery(props.id);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {pokemonLoading ? <>
            <h2>Loading...</h2>
            <Spinner />
        </> : pokemonError ? <>
            <h2>Pokémon Info</h2>
            <p className="error">Failed to load data!</p>
        </> : !pokemonData ? <>
            <h2>Pokémon Info</h2>
            <p>No data!</p>
        </> : <>
            <h2>{pokemonData.name}</h2>
            <p>TODO</p>
        </>}
    </>;
};
