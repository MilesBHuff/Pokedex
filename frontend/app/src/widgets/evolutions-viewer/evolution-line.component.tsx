import type {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {comparePokemonsById} from '@/utilities/compare-pokemon-by-id.function.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {isValidNumber} from '@/utilities/is-valid-number';
import {completeEvolutionLine} from '@/widgets/evolutions-viewer/complete-evolution-line.function';
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

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /* State variables */

    // Spinner control
    const [isLoading, setIsLoading] = useState(true);
    const [isBranching, setIsBranching] = useState(false);

    // Knowledge
    const [idValid, setIdValid] = useState(false);
    const [isTree, setIsTree] = useState(false);

    // Evolution storage
    const [targetChainLink, setTargetChainLink] = useState(props.initialChainLink);
    const [initialEvolutionLine, setInitialEvolutionLine] = useState([] as Array<BasicPokemonInfo>);
    const [fullEvolutionLine, setFullEvolutionLine] = useState([] as Array<BasicPokemonInfo>);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /* Logic controllers */

    const onPropsChange = () => setIsLoading(true);
    useEffect(onPropsChange, [props]);

    const rebranch: MouseEventHandler<HTMLButtonElement> = () => setIsBranching(true);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** Whenever the props change, we need to rebuild the evolution line from scratch. */
    const onLoading = (): void => {
        if(!isLoading) return;

        // Validate any new ID
        const newIdValid = isValidNumber(props.speciesId);
        setIdValid(newIdValid);

        // Assemble the line up to and including the target Pokémon
        const newInitialEvolutionLine = [] as Array<BasicPokemonInfo>;
        const newTargetChainLink = (props.speciesId === undefined ? null : (
            findIdInChain(props.initialChainLink, props.speciesId, newInitialEvolutionLine)
        )) ?? props.initialChainLink;
        setTargetChainLink(newTargetChainLink);
        setInitialEvolutionLine(newInitialEvolutionLine);

        // Assemble the line following the target Pokémon
        const newFullEvolutionLine = [...newInitialEvolutionLine];
        const newIsBranching = !!completeEvolutionLine(newTargetChainLink, newFullEvolutionLine);
        setFullEvolutionLine(newFullEvolutionLine);
        setIsTree(newIsBranching);

        // Done
        setIsLoading(false);
    };
    useEffect(onLoading, [isLoading]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** Regenerate the evolutions that come after the `targetChainLink`, making sure to generate something different than last time. */
    const onBranching = () => {
        if(!isBranching) return;

        // Initialize variables
        let newEvolutionsForLine = [] as Array<BasicPokemonInfo>;
        let newFullEvolutionLine = [] as Array<BasicPokemonInfo>;

        // Retry until we get a new line
        while(true) {
            completeEvolutionLine(targetChainLink, newEvolutionsForLine);
            newFullEvolutionLine = initialEvolutionLine.concat(newEvolutionsForLine);
            if(!comparePokemonsById(newFullEvolutionLine, fullEvolutionLine)) break;

            // Reset variables for another run
            newEvolutionsForLine = [];
            newFullEvolutionLine = [];
        }

        // Done
        setFullEvolutionLine(newFullEvolutionLine);
        setIsBranching(false);
    };
    useEffect(onBranching, [isBranching]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return isLoading ? (
        <SpinnerComponent inline={true} />
    ) : <>
        {(isBranching ? initialEvolutionLine : fullEvolutionLine).map((chainLink, index) => (
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

        {isTree ? <>
            {isBranching ? (
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
