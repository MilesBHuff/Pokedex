import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {isValidNumber} from '@/utilities/isValidNumber.ts';
import {urlToId} from '@/utilities/url-to-id';
import {ChainLink} from 'pokenode-ts';
import {Fragment, FunctionComponent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a line. */
export const EvolutionLine: FunctionComponent<{chain: ChainLink, id?: number | undefined}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [line, setLine] = useState([] as Array<BasicPokemonInfo>);
    const updateLine = () => setLine(chainToLine(props.chain, props.id));
    useEffect(updateLine, [props]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {line.map((link, index) => (
            <Fragment key={index}>
                {isValidNumber(props.id) && link.id === props.id ? <>
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
/** Convert the chain into a line. */
const chainToLine = (
    chain: ChainLink,
    id?: number | undefined,
): Array<BasicPokemonInfo> => {
    const line: Array<BasicPokemonInfo> = [];

    /** Add a chain link to the line. */
    const addToLine = (
        link: ChainLink,
        idFound: boolean = false,
    ): void => {

        // Add the current link.
        line.push({
            id: urlToId(link.species.url),
            name: link.species.name,
        });

        // Set the next link.
        if(link.evolves_to.length < 1) return; // End of the line.
        let nextInLine: ChainLink | void;

        // If we haven't matched the ID yet, check the current ID.
        if(!idFound) {
            idFound = isValidNumber(id) && id === urlToId(link.species.url);
        }

        // If even the current ID wasn't a match, try looking deeper
        if(!idFound) {
            for(let i = 0; i < link.evolves_to.length; i++) {
                if(urlToId(link.evolves_to[i]!.species.url) === id) {
                    idFound = true;
                    nextInLine = link.evolves_to[i]!;
                    break;
                }
            }
            //BUG:  If the match is one level deeper, this won't find it, and we'll end-up going with a random index...
            //TODO:  Make this recursive somehow, to fix the above bug.
        }

        // If we have no next-in-line at this point, then we can choose the next node at random.
        if(!nextInLine) {
            if(link.evolves_to.length > 1) { //WARN:  This is only a rough approximation of tree evolutions;  please use `EvolutionTree` instead of `EvolutionLine` to properly display evolution trees.
                const index = Math.floor(Math.random() * link.evolves_to.length); // Choosing a random index to at least get some variety.
                nextInLine = link.evolves_to[index]!;
            } else {
                nextInLine = link.evolves_to[0]!;
            }
        }

        // Add the next link.
        addToLine(nextInLine, idFound);
    };
    addToLine(chain);
    return line;
};
