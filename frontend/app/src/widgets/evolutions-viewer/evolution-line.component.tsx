import type {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {isValidNumber} from '@/utilities/isValidNumber.ts';
import {completeEvolutionLine} from '@/widgets/evolutions-viewer/complete-evolution-line.ts';
import {findIdInChain} from '@/widgets/evolutions-viewer/find-id-in-chain.function.ts';
import {SpinnerComponent} from '@/widgets/spinner.component.tsx';
import type {ChainLink} from 'pokenode-ts';
import type {FunctionComponent} from 'react';
import {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a line. */
export const EvolutionLineComponent: FunctionComponent<{
    initialChainLink: Readonly<ChainLink>,
    speciesId?: number | undefined,
}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [evolutionCounter, setEvolutionCounter] = useState(0);
    const [isReloading, setIsReloading] = useState(false);
    const rerenderComponent = () => {
        setEvolutionCounter(evolutionCounter + 1);
        setIsReloading(true);
    };

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
    const [isBranching, setIsBranching] = useState(false); //TODO: Set this in `onPropsChange`.

    const onReload = (): void => { //TODO: Re-run if we end-up with the same tree we had before.
        const newEvolutionsForLine: Array<BasicPokemonInfo> = [];
        setIsBranching(!!completeEvolutionLine(targetChainLink ?? props.initialChainLink, newEvolutionsForLine));
        setFullEvolutionLine(initialEvolutionLine.concat(newEvolutionsForLine));
        setIsReloading(false);
    };
    useEffect(onReload, [targetChainLink, evolutionCounter]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {(isReloading ? initialEvolutionLine : fullEvolutionLine).map((chainLink, index) => (
            <Fragment key={index}>
                {idValid && chainLink.id === props.speciesId ? (
                    displayifyName(chainLink.name)
                ) : (
                    <Link to={`/pokemon?id=${chainLink.id}`}>
                        {displayifyName(chainLink.name)}
                    </Link>
                )}

                {/* NOTE: The below works fine even when we're using the `initialEvolutionLine`.
                  * It should only break if `initialEvolutionLine` and `fullEvolutionLine` have the same length,
                  * but if that's the case, then we're at the end of a chain;  and the ends of chains don't have evolutions, meaning they can't be rebranched, meaning this edge case is impossible.
                  * So while this *looks* like it would cause a bug, it actually works perfectly every time.
                  * Accordingly, it's not worth the extra CPU time it would take to *properly* consider the `isReloading` condition.
                  */}
                {index < fullEvolutionLine.length - 1 ? ' 🠞 ' : ''}
            </Fragment>
        ))}

        {isBranching ? <>
            {isReloading ? <>
                <SpinnerComponent inline={true} />
            </> : (
                <button type="button" className="inline-button" onClick={rerenderComponent}>Rebranch</button>
            )}

            <br />
            <span className="error notelet">
                <strong>Warning:</strong> This Pokémon has a branching evolution chain that is not well-supported by this application.
            </span>
        </> : null}
    </>;
};
