import type {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {comparePokemonsById} from '@/utilities/compare-pokemon-by-id.function.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {isValidNumber} from '@/utilities/isValidNumber.ts';
import {completeEvolutionLine} from '@/widgets/evolutions-viewer/complete-evolution-line.ts';
import {findIdInChain} from '@/widgets/evolutions-viewer/find-id-in-chain.function.ts';
import {SpinnerComponent} from '@/widgets/spinner.component.tsx';
import type {ChainLink} from 'pokenode-ts';
import type {FunctionComponent, MouseEventHandler} from 'react';
import {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a line. */
export const EvolutionLineComponent: FunctionComponent<{
    initialChainLink: Readonly<ChainLink>,
    speciesId?: number | undefined,
}> = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [idValid, setIdValid] = useState(false);
    const [targetChainLink, setTargetChainLink] = useState(props.initialChainLink);
    const [initialEvolutionLine, setInitialEvolutionLine] = useState([] as Array<BasicPokemonInfo>);
    const [fullEvolutionLine, setFullEvolutionLine] = useState([] as Array<BasicPokemonInfo>);
    const [isBranching, setIsBranching] = useState(false);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** Whenever the props change, we need to rebuild the evolution line from scratch. */
    const onPropsChange = (): void => {

        // Validate any new ID
        const newIdValid = isValidNumber(props.speciesId);
        setIdValid(newIdValid);

        // Assemble the line up to and including the target Pokémon
        const newInitialEvolutionLine = [] as Array<BasicPokemonInfo>;
        const newTargetChainLink = (
            props.speciesId === undefined ? null :
                findIdInChain(props.initialChainLink, props.speciesId, newInitialEvolutionLine)
        ) ?? props.initialChainLink;
        setTargetChainLink(newTargetChainLink);
        setInitialEvolutionLine(newInitialEvolutionLine);

        // Assemble the line following the target Pokémon
        const newFullEvolutionLine = [...newInitialEvolutionLine];
        const newIsBranching = !!completeEvolutionLine(newTargetChainLink, newFullEvolutionLine);
        setFullEvolutionLine(newFullEvolutionLine);
        setIsBranching(newIsBranching);

        // Done
        setIsLoading(false);
    };
    useEffect(onPropsChange, [props.initialChainLink, props.speciesId]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [evolutionCounter, setEvolutionCounter] = useState(0);
    const rebranch: MouseEventHandler<HTMLButtonElement> = () => {
        setIsLoading(true);
        setEvolutionCounter(evolutionCounter + 1);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** Regenerate the evolutions that come after the `targetChainLink`, making sure to generate something different than last time. */
    const onRebranch = () => {
        if(evolutionCounter === 0) return;

        // Initialize variables
        let newEvolutionsForLine = [] as Array<BasicPokemonInfo>;
        let newFullEvolutionLine = [] as Array<BasicPokemonInfo>;

        // Retry until we get a new line
        while(true) {
            completeEvolutionLine(targetChainLink, newEvolutionsForLine);
            newFullEvolutionLine = initialEvolutionLine.concat(newEvolutionsForLine);
            if(!!comparePokemonsById(newFullEvolutionLine, fullEvolutionLine)) break;

            // Reset variables for another run
            newEvolutionsForLine = [];
            newFullEvolutionLine = [];
        }

        // Done
        setFullEvolutionLine(newFullEvolutionLine);
        setIsLoading(false);
    };
    useEffect(onRebranch, [evolutionCounter]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {(isLoading ? initialEvolutionLine : fullEvolutionLine).map((chainLink, index) => (
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
                  * Accordingly, it's not worth the extra CPU time it would take to *properly* consider the `isLoading` condition.
                  */}
                {index < fullEvolutionLine.length - 1 ? ' 🠞 ' : ''}
            </Fragment>
        ))}

        {isBranching ? <>
            {isLoading ? (
                <SpinnerComponent inline={true} />
            ) : (
                <button type="button" className="inline-button" onClick={rebranch}>Rebranch</button>
            )}

            <br />
            <span className="error notelet">
                <strong>Note:</strong> The above is one of multiple possible evolution chains for this Pokémon.
            </span>
        </> : null}
    </>;
};
