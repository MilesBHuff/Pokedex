import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {isValidNumber} from '@/utilities/isValidNumber.ts';
import {chainToLine} from '@/widgets/evolutions-viewer/chain-to-line.ts';
import {ChainLink} from 'pokenode-ts';
import {Fragment, FunctionComponent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a line. */
export const EvolutionLine: FunctionComponent<{chainLink: ChainLink, speciesId?: number | undefined}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [evolutionCounter, setEvolutionCounter] = useState(0);
    const rerenderComponent = () => setEvolutionCounter(evolutionCounter + 1);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [line, setLine] = useState([] as Array<BasicPokemonInfo>);
    const [idValid, setIdValid] = useState(false);
    const [isBranching, setIsBranching] = useState(false);
    const onPropsChange = () => {
        const {evolutionLine, branchingDepth} = chainToLine(props.chainLink, props.speciesId);
        setLine(evolutionLine);
        setIsBranching(!!branchingDepth);
        setIdValid(isValidNumber(props.speciesId));
    };
    useEffect(onPropsChange, [props, evolutionCounter]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {line.map((link, index) => (
            <Fragment key={index}>
                {idValid && link.id === props.speciesId ? (
                    displayifyName(link.name)
                ) : (
                    <Link to={`/pokemon?id=${link.id}`}>
                        {displayifyName(link.name)}
                    </Link>
                )}
                {index < line.length - 1 ? ' 🠞 ' : ''}
            </Fragment>
        ))}
        {isBranching ? <>
            <button type="button" onClick={rerenderComponent}>Rebranch</button>
            <br />
            <span className="error notelet"><strong>Warning:</strong> This Pokémon has a branching evolution chain that is not well-supported by this application.</span>
        </> : null}
    </>;
};
