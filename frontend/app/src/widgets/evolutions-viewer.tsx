import {useEvolutionsByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {EvolutionLine} from '@/widgets/evolutions/evolution-line.tsx';
import {EvolutionTree} from '@/widgets/evolutions/evolution-tree.tsx';
import {ChainLink} from 'pokenode-ts';
import {FunctionComponent, useEffect, useState} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const EvolutionsViewer: FunctionComponent<{evolutionId: number, pokemonId?: number}> = props => {

    const {data: evolutions} = useEvolutionsByIdQuery(props.evolutionId);
    // useEffect(() => console.debug(evolutions), [evolutions]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** Figures out whether the evolution chain is a line or a tree. */
    const calcLinearity = (link: ChainLink, isLinear = true): boolean => {
        if(!isLinear) return isLinear; // If we've already found non-linearity, then return early to save on resources.
        switch(link.evolves_to.length) {
            case 0: // End of the line; no impact on linearity.
                return isLinear;
            case 1: // This link is linear, but the next one might not be.
                return calcLinearity(link.evolves_to[0]!); //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `index` is a known valid key for `link.evolves_to`.
            default: // This link is non-linear.
                return false;
        }
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** Whether the evolution chain is a line or a tree. */
    const [isLinear, setIsLinear] = useState(true);
    const updateLinearity = (): void => {
        if(evolutions) setIsLinear(calcLinearity(evolutions.chain));
    };
    useEffect(updateLinearity, [evolutions]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {evolutions ? (
            <span className="evolutions-viewer">
                {isLinear ? (
                    <EvolutionLine chain={evolutions.chain} id={props.pokemonId} />
                ) : (
                    <EvolutionTree chain={evolutions.chain} id={props.pokemonId} />
                )}
            </span>
        ) : null}
    </>;
};
