import {useEvolutionsByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {isValidNumber} from '@/utilities/isValidNumber.ts';
import {urlToId} from '@/utilities/url-to-id';
import {ChainLink} from 'pokenode-ts';
import {Fragment, FunctionComponent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const EvolutionsViewer: FunctionComponent<{evolutionId: number, speciesId?: number | undefined}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const {data: evolutions} = useEvolutionsByIdQuery(props.evolutionId);
    // useEffect(() => console.debug(evolutions), [evolutions]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {evolutions ? (
            <span className="evolutions-viewer">
                <EvolutionLine chainLink={evolutions.chain} speciesId={props.speciesId} />
            </span>
        ) : null}
    </>;
};

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a line. */
const EvolutionLine: FunctionComponent<{chainLink: ChainLink, speciesId?: number | undefined}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [line, setLine] = useState([] as Array<BasicPokemonInfo>);
    const [idValid, setIdValid] = useState(false);
    const onPropsChange = () => {
        setLine(chainToLine(props.chainLink, props.speciesId));
        setIdValid(isValidNumber(props.speciesId));
    }
    useEffect(onPropsChange, [props]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {line.map((link, index) => (
            <Fragment key={index}>
                {idValid && link.id === props.speciesId ? <>
                    {displayifyName(link.name)}
                </> : <>
                    <Link to={`/pokemon?id=${link.id}`}>
                        {displayifyName(link.name)}
                    </Link>
                </>}
                {index < line.length - 1 ? ' 🠞 ' : ''}
            </Fragment>
        ))}
    </>;
};

////////////////////////////////////////////////////////////////////////////////
/** Given a `ChainLink` and optionally a `speciesId`, build and return a valid linear evolution chain in the form of an ordered `Array`.
 * @param chainLink The `ChainLink` you'd like to work from.
 * @param [speciesId] The `speciesId` you'd like to build an `evolutionLine` for.
 * @returns an ordered `Array` containing a linear evolution chain for a given `speciesId` (or random, if omitted).
 */
const chainToLine = (
    chainLink: ChainLink,
    speciesId?: number | undefined,
): Array<BasicPokemonInfo> => {
    const evolutionLine: Array<BasicPokemonInfo> = [];

    // If an ID was passed, try to build up a line to it.
    if(speciesId) {
        const newChain = findIdInChain(chainLink, speciesId, evolutionLine);

        // If the new chain is valid, save it over the old.
        if(newChain) chainLink = newChain;
    }

    // Complete the evolution line.
    completeEvolutionLine(chainLink, evolutionLine); //TODO: Do something with the return value from this.
    return evolutionLine;
}

////////////////////////////////////////////////////////////////////////////////
/** Find where a Pokémon is in a chain, and return the node that contains that Pokémon.
 * @param chainLink The `ChainLink` to start from.
 * @param speciesId The species ID for the Pokémon you're searching for.
 * @param [evolutionLine] Where this function should store the path taken to get to the target `speciesId`.  Please ensure your line is an empty `Array`, for maximum sanity. 
 * @param [evolutionLineProvided] Whether an `evolutionLine` was provided.  Used to avoid unnecessary `null`checks.  Please do not provide this parameter yourself.
 * @returns the `ChainLink` that contained the species ID, or `null` if there were no matches.
**/
//FIXME: Doesn't work for branching evolutions.  :(
const findIdInChain = (
    chainLink: ChainLink,
    speciesId: number,
    evolutionLine?: Array<BasicPokemonInfo> | undefined,
    evolutionLineProvided: boolean = !!evolutionLine,
): ChainLink | null => {
    const chainLinkSpeciesId = urlToId(chainLink.species.url);

    // Assume that this is either the matching node *or* a step on the way to the matching node.
    if(evolutionLineProvided) evolutionLine!.push({
        name: chainLink.species.name, 
        id: chainLinkSpeciesId,
    });
    
    // If the current node matches, then return it.
    if(chainLinkSpeciesId === speciesId) {
        return chainLink;
    }

    // Else, if there are no futher nodes to investigate, remove what we just added and return.
    if(chainLink.evolves_to.length <= 0) {
        if(evolutionLineProvided) evolutionLine!.pop();
        return null;
    }

    // Else, investigate further nodes.
    for(const nextLink of chainLink.evolves_to) {
        const result = findIdInChain(nextLink, speciesId, evolutionLine, evolutionLineProvided);
        if(result) return result
    }

    // Fallback return, to please TypeScript.
    return null;
};

////////////////////////////////////////////////////////////////////////////////
/** Fill out a provided `evolutionsLine` with the rest of the evolution chain.
 * @param chainLink The `ChainLink` to start from.
 * @param evolutionLine Where to store the path taken through the chain.
 * @param [depth] The number of times this function has recursed.  Please do not provide this paramter yourself.
 * @param [branchingFound] Whether branching has been found.  Please do not provide this parameter yourself.
 * @returns the depth at which the chain branches, or `0` if it remains linear.
**/
const completeEvolutionLine = (
    chainLink: ChainLink,
    evolutionLine: Array<BasicPokemonInfo>,
    depth: number = 0,
    branchingFound: boolean = false,
): number => {
    
    // If there are no deeper `chainLink`s, then we're done!
    if(chainLink.evolves_to.length <= 0) {
        return branchingFound ? depth : 0;
    }

    // Check evolutions for branching.
    branchingFound = chainLink.evolves_to.length > 1;

    // If branching was found, set the `index` at random;  else, set it to `0`.
    const index = branchingFound ? Math.floor(Math.random() * chainLink.evolves_to.length) : 0;
    const nextChainLink = chainLink.evolves_to[index]!;

    // Save the chosen `chainLink` in the `evolutionLine`.
    evolutionLine.push({
        name: nextChainLink.species.name, 
        id: urlToId(nextChainLink.species.url),
    });

    // Visit the next chain link.
    return completeEvolutionLine(nextChainLink, evolutionLine, depth + 1, branchingFound);
}
