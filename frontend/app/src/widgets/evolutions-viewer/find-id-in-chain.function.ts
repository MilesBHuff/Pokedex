import type {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {urlToId} from '@/utilities/url-to-id.ts';
import type {ChainLink} from 'pokenode-ts';

////////////////////////////////////////////////////////////////////////////////
/** Find where a Pokémon is in a chain, and return the node that contains that Pokémon.
 * @param chainLink The `ChainLink` to start from.
 * @param speciesId The species ID for the Pokémon you're searching for.
 * @param [evolutionLine] Where this function should store the path taken to get to the target `speciesId`.  Please ensure your line is an empty `Array`, for maximum sanity. 
 * @param [evolutionLineProvided] Whether an `evolutionLine` was provided.  Used to avoid unnecessary `null`checks.  Please do not provide this parameter yourself.
 * @param [trialDepth] How deep into a speculative line we've gone.  Please do not provide this parameter yourself.
 * @returns the `ChainLink` that contained the species ID, or `null` if there were no matches.
**/
export const findIdInChain = (
    chainLink: Readonly<ChainLink>,
    speciesId: number,
    evolutionLine?: Array<BasicPokemonInfo> | undefined,
    evolutionLineProvided: boolean = !!evolutionLine,
    trialDepth: number = 0,
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
        if(evolutionLineProvided) {
            for(let i = 0; i < trialDepth; i++) {
                evolutionLine!.pop(); //FIXME:  We need to pop off as many times as we have recursed.  Test with Dustox.
            }
        }
        return null;
    }

    // Else, investigate further nodes.
    for(const nextLink of chainLink.evolves_to) {
        const result = findIdInChain(nextLink, speciesId, evolutionLine, evolutionLineProvided, trialDepth + 1);
        if(result) return result;
    }

    // Fallback return, to please TypeScript.
    return null;
};
