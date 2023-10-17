import {useEvolutionsByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {getIdFromUrl} from '@/utilities/get-id-from-url.function.ts';
import {ChainLink} from 'pokenode-ts';
import {Fragment, FunctionComponent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const EvolutionsViewer: FunctionComponent<{evolutionId: number, pokemonId?: number}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const {data: evolutions} = useEvolutionsByIdQuery(props.evolutionId);
    // useEffect(() => console.debug(evolutions), [evolutions]);
    const [chain, setChain] = useState([] as Array<BasicPokemonInfo>);
    const [eeveeWarning, setEeveeWarning] = useState(false);

    /** Convert the raw chain information into something we can actually display. */
    const compileChain = (): void => {
        if(!evolutions) return;
        const newChain: Array<BasicPokemonInfo> = [];

        const addToChain = (link: ChainLink): void => {
            newChain.push({
                id: getIdFromUrl(link.species.url),
                name: link.species.name,
            });

            if(link.evolves_to.length <= 1) {
                if(link.evolves_to[0]) addToChain(link.evolves_to[0]);
                setEeveeWarning(false);
            } else {
                //NOTE:  The current approach won't work for the Eeveelutions.  Choosing a random index to at least get some variety.
                const index = Math.floor(Math.random() * (link.evolves_to.length));
                if(link.evolves_to[index]) addToChain(link.evolves_to[index]!); //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `index` is a known valid key for `link.evolves_to`.
                setEeveeWarning(true);
            }
        };
        addToChain(evolutions.chain);
        setChain(newChain);
    };
    useEffect(compileChain, [evolutions]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        <span className="evolutions-viewer">
            {chain.map((link, index) => (
                <Fragment key={index}>
                    {link.id === props.pokemonId ? <>
                        {displayifyName(link.name)}
                    </> : <>
                        <Link to={`/pokemon?id=${link.id}`}>
                            {displayifyName(link.name)}
                        </Link>
                    </>}
                    {index < chain.length - 1 ? ' 🠞 ' : ''}
                </Fragment>
            ))}
            {eeveeWarning ? <><br/><span className="error notelet"><strong>Warning:</strong> This Pokémon has a branching evolution chain that is not yet supported by this application.</span></> : null}
        </span>
    </>;
};
