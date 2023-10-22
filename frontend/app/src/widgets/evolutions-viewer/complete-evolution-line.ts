import type {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {urlToId} from '@/utilities/url-to-id.ts';
import type {ChainLink} from 'pokenode-ts';

////////////////////////////////////////////////////////////////////////////////
/** Fill out a provided `evolutionsLine` with the rest of the evolution chain.
 * @param chainLink The `ChainLink` to start from.
 * @param evolutionLine Where to store the path taken through the chain.
 * @param [depth] The number of times this function has recursed.  Please do not provide this paramter yourself.
 * @param [branchingFound] Whether branching has been found.  Please do not provide this parameter yourself.
 * @returns the depth at which the chain branches, or `0` if it remains linear.
**/
export const completeEvolutionLine = (
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
    if(!branchingFound) branchingFound = chainLink.evolves_to.length > 1;

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
};
