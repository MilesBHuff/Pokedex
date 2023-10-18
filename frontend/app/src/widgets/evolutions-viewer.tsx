import {useEvolutionsByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {isValidNumber} from '@/utilities/isValidNumber.ts';
import {urlToId} from '@/utilities/url-to-id';
import {EvolutionLine} from '@/widgets/evolutions/evolution-line.tsx';
import {EvolutionTree} from '@/widgets/evolutions/evolution-tree.tsx';
import {ChainLink} from 'pokenode-ts';
import {FunctionComponent, useEffect, useState} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const EvolutionsViewer: FunctionComponent<{evolutionId: number, speciesId?: number | undefined}> = props => {

    const {data: evolutions} = useEvolutionsByIdQuery(props.evolutionId);
    // useEffect(() => console.debug(evolutions), [evolutions]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** Whether the evolution chain is a line or a tree. */
    const [isLinear, setIsLinear] = useState(true);
    const updateLinearity = (): void => {
        if(evolutions && isValidNumber(props.speciesId)) {
            setIsLinear(calcLinearity(evolutions.chain, props.speciesId));
        }
    };
    useEffect(updateLinearity, [evolutions, props]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {evolutions ? (
            <span className="evolutions-viewer">
                {isLinear ? (
                    <EvolutionLine chain={evolutions.chain} id={props.speciesId} />
                ) : (
                    <EvolutionTree chain={evolutions.chain} id={props.speciesId} />
                )}
            </span>
        ) : null}
    </>;
};

////////////////////////////////////////////////////////////////////////////////
/** Figures out whether the evolution chain is a line or a tree from the current ID. */
const calcLinearity = (
    link: ChainLink,
    id?: number | undefined,
    isLinear: boolean = true,
    idFound: boolean = false,
): boolean => {
    if(!isLinear) return isLinear; // If we've already found non-linearity, then return early to save on resources.

    // Check to see if the current ID matchs the link ID;  if so, continue.
    if(!idFound && isValidNumber(id)) {
        if(id === urlToId(link.species.url)) {
            idFound = true;
        } else {

            // Skip through the chain until we find the current ID;  trees can become linear on their branches.
            for(let i = 0; i < link.evolves_to.length; i++) {
                if(id === urlToId(link.evolves_to[i]!.species.url)) {
                    return calcLinearity(link.evolves_to[i]!, id, isLinear, idFound = true);
                }
            }
        }
    }

    // Check the length to ascertain linearity.
    switch(link.evolves_to.length) {
        case 0: // End of the line; no impact on linearity.
            return isLinear;
        case 1: // This link is linear, but the next one might not be.
            return calcLinearity(link.evolves_to[0]!, id, isLinear, idFound);
        default: // This link is non-linear.
            return false;
    }
};
