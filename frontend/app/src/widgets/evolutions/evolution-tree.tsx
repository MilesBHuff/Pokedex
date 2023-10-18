import {EvolutionLine} from '@/widgets/evolutions/evolution-line.tsx';
import {ChainLink} from 'pokenode-ts';
import {FunctionComponent, useState} from 'react';

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a tree. */
export const EvolutionTree: FunctionComponent<{chain: ChainLink, id?: number | undefined}> = props => {
    //TODO: Implement.

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [evolutionCounter, setEvolutionCounter] = useState(0);
    const rerenderComponent = () => setEvolutionCounter(evolutionCounter + 1);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        <EvolutionLine key={evolutionCounter} chain={props.chain} id={props.id} /><button type="button" onClick={rerenderComponent}>Rebranch</button>
        <br />
        <span className="error notelet"><strong>Warning:</strong> This Pokémon has a branching evolution chain that is not well-supported by this application.</span>
    </>;
};
