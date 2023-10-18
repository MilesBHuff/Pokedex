import {EvolutionLine} from '@/widgets/evolutions/evolution-line.tsx';
import {ChainLink} from 'pokenode-ts';
import {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a tree. */
export const EvolutionTree: FunctionComponent<{chain: ChainLink, id?: number | undefined}> = props => {
    //TODO: Implement.

    return <>
        <EvolutionLine chain={props.chain} id={props.id} />
        <br/>
        <span className="error notelet"><strong>Warning:</strong> This Pokémon has a branching evolution chain that is not yet supported by this application.</span>
    </>;
};
