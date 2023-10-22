import {totalPokemonInDex} from '@/consts.ts';
import {usePokemonByIdQuery, useSpeciesByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {displayifyName} from '@/utilities/displayify-name.function';
import {urlToId} from '@/utilities/url-to-id';
import {EvolutionsViewerComponent} from '@/widgets/evolutions-viewer/evolutions-viewer.component';
import {PokemonAbilitiesComponent} from '@/widgets/pokemon-abilities.component';
import {PokemonMovesComponent} from '@/widgets/pokemon-moves.component';
import {PokemonSpritesComponent} from '@/widgets/pokemon-sprites.component.tsx';
import {PokemonTypesComponent} from '@/widgets/pokemon-types.component.tsx';
import {SpinnerComponent} from '@/widgets/spinner.component.tsx';
import type {FunctionComponent} from 'react';
import {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const PokemonInfoComponent: FunctionComponent = () => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [searchParams] = useSearchParams();
    const [id, setId] = useState(undefined as number | undefined); // The Pokémon's National 'Dex Number

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
                <SpinnerComponent />
            </> : (
                <PokemonInfoCore id={id} />
            )}
        </div>
    );
};

////////////////////////////////////////////////////////////////////////////////
export const PokemonInfoCore: FunctionComponent<{
    id: number,
}> = props => {
    const navigate = useNavigate();

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const {data: pokemon, error: pokemonError, isFetching: pokemonLoading} = usePokemonByIdQuery(props.id);
    // useEffect(() => console.debug(pokemon), [pokemon]);
    const {data: species, isFetching: speciesLoading} = useSpeciesByIdQuery(props.id);
    // useEffect(() => console.debug(species), [species]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {pokemonLoading || speciesLoading ? <>
            <h2>Loading... (#{props.id})</h2>
            <SpinnerComponent />
        </> : pokemonError ? <>
            <h2>Pokémon #{props.id}</h2>
            <p className="error">Failed to load data!</p>
            <p>Did you enter a valid Pokédex index?</p>
        </> : !pokemon ? <>
            <h2>Pokémon #{props.id}</h2>
            <p>No data!</p>
        </> : <>
            <div className="title-with-actions">
                <div className="actions">
                    <button className="button-secondary" onClick={() => void navigate(`/pokemon?id=${props.id - 1}`)} disabled={props.id - 1 < 1}>prev</button>
                    <button className="button-secondary" onClick={() => void navigate(`/pokemon?id=${props.id + 1}`)} disabled={props.id + 1 > totalPokemonInDex}>next</button>
                </div>
                <h2>{displayifyName(species?.name ?? pokemon.name)} (#{props.id})</h2>
            </div>
            <ul>
                {!species ? null :
                    <li><strong>Evolution Tree: </strong>
                        <EvolutionsViewerComponent evolutionId={urlToId(species.evolution_chain.url)} speciesId={species.id} />
                        {/* TODO: Hide if no evolutions. Not as easy as it first seems, because it requires passing a value up from the child `EvolutionsViewer` component. */}
                    </li>
                }
                <li><PokemonSpritesComponent sprites={pokemon.sprites}/></li>
                <li><strong>Types: </strong>
                    <PokemonTypesComponent types={pokemon.types} />
                </li>
                <li><strong>Abilities: </strong>
                    <PokemonAbilitiesComponent abilities={pokemon.abilities} />
                </li>
                <li><strong>Moves: </strong>
                    <PokemonMovesComponent moves={pokemon.moves} />
                </li>
            </ul>
        </>}
    </>;
};
