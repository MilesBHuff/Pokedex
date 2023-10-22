import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {completeEvolutionLine} from '@/widgets/evolutions-viewer/complete-evolution-line.ts';
import {findIdInChain} from '@/widgets/evolutions-viewer/find-id-in-chain.function.ts';
import {ChainLink} from 'pokenode-ts';

////////////////////////////////////////////////////////////////////////////////
export interface ChainToLineReturnType {
    /** An ordered `Array` containing a linear evolution chain for a given `speciesId` (or random, if omitted). */
    evolutionLine: Array<BasicPokemonInfo>,
    /** The depth at which branching was found, or `0` if it wasn't. */
    branchingDepth: number,
}

////////////////////////////////////////////////////////////////////////////////
/** Given a `ChainLink` and optionally a `speciesId`, build and return a valid linear evolution chain in the form of an ordered `Array`.
 * @param chainLink The `ChainLink` you'd like to work from.
 * @param [speciesId] The `speciesId` you'd like to build an `evolutionLine` for.
 * @returns an `object` containing the constructed evolution line as an ordered `Array` in addition to the depth at which branching was found.
 */
export const chainToLine = (
    chainLink: ChainLink,
    speciesId?: number | undefined,
): ChainToLineReturnType => {
    const evolutionLine: Array<BasicPokemonInfo> = [];

    // If an ID was passed, try to build up a line to it.
    if(speciesId) {
        const newChain = findIdInChain(chainLink, speciesId, evolutionLine);

        // If the new chain is valid, save it over the old.
        if(newChain) chainLink = newChain;
    }

    // Complete the evolution line.
    const branchingDepth = completeEvolutionLine(chainLink, evolutionLine);
    return {
        evolutionLine,
        branchingDepth,
    };
};
