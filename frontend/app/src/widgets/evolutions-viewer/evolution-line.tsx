import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {isValidNumber} from '@/utilities/isValidNumber.ts';
import {completeEvolutionLine} from '@/widgets/evolutions-viewer/complete-evolution-line.ts';
import {findIdInChain} from '@/widgets/evolutions-viewer/find-id-in-chain.function.ts';
import {ChainLink} from 'pokenode-ts';
import {Fragment, FunctionComponent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a line. */
export const EvolutionLine: FunctionComponent<{initialChainLink: ChainLink, speciesId?: number | undefined}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [evolutionCounter, setEvolutionCounter] = useState(0);
    const rerenderComponent = () => setEvolutionCounter(evolutionCounter + 1);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /* Whenever the props change, we need to rebuild the evolution line from scratch. */
    const [idValid, setIdValid] = useState(false);
    const [initialEvolutionLine, setInitialEvolutionLine] = useState([] as Array<BasicPokemonInfo>);
    const [targetChainLink, setTargetChainLink] = useState(null as ChainLink | null);

    const onPropsChange = (): void => {
        const newIdValid = isValidNumber(props.speciesId);
        setIdValid(newIdValid);
        if(newIdValid) {

            const newEvolutionLine: Array<BasicPokemonInfo> = [];
            setTargetChainLink(findIdInChain(props.initialChainLink, props.speciesId!, newEvolutionLine));
            setInitialEvolutionLine(newEvolutionLine);
        }
    };
    useEffect(onPropsChange, [props.initialChainLink, props.speciesId]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /* When we reload, we need to regenerate the evolutions that come after the `targetChainLink`. */
    const [fullEvolutionLine, setFullEvolutionLine] = useState([] as Array<BasicPokemonInfo>);
    const [isBranching, setIsBranching] = useState(false);

    const onReload = (): void => {
        const newEvolutionsForLine: Array<BasicPokemonInfo> = [];
        setIsBranching(!!completeEvolutionLine(targetChainLink ?? props.initialChainLink, newEvolutionsForLine));
        setFullEvolutionLine(initialEvolutionLine.concat(newEvolutionsForLine));
    };
    useEffect(onReload, [targetChainLink, evolutionCounter]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {fullEvolutionLine.map((chainLink, index) => (
            <Fragment key={index}>
                {idValid && chainLink.id === props.speciesId ? (
                    displayifyName(chainLink.name)
                ) : (
                    <Link to={`/pokemon?id=${chainLink.id}`}>
                        {displayifyName(chainLink.name)}
                    </Link>
                )}
                {index < fullEvolutionLine.length - 1 ? ' 🠞 ' : ''}
            </Fragment>
        ))}

        {isBranching ? <>
            <button type="button" onClick={rerenderComponent}>Rebranch</button>
            <br />
            <span className="error notelet"><strong>Warning:</strong> This Pokémon has a branching evolution chain that is not well-supported by this application.</span>
        </> : null}
    </>;
};
