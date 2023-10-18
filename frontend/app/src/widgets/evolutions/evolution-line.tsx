import {BasicPokemonInfo} from '@/types/pokemon.type.ts';
import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {getIdFromUrl} from '@/utilities/get-id-from-url.function.ts';
import {isValidNumber} from '@/utilities/isValidNumber.ts';
import {ChainLink} from 'pokenode-ts';
import {Fragment, FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
/** Displays an evolution chain in the form of a line. */
export const EvolutionLine: FunctionComponent<{chain: ChainLink, id?: number | undefined}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    /** Convert the chain into a line. */
    const chainToLine = (chain: ChainLink): Array<BasicPokemonInfo> => {
        const line: Array<BasicPokemonInfo> = [];

        const addToLine = (link: ChainLink): void => {
            line.push({
                id: getIdFromUrl(link.species.url),
                name: link.species.name,
            });

            // Add the next node to the line.
            if(link.evolves_to.length < 1) return; // End of the line.
            let nextInLine: ChainLink = link.evolves_to[0]!; //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `i` is a known valid index for `link.evolves_to`.
            if(isValidNumber(props.id)) {
                for(let i = 1; i < link.evolves_to.length; i++) {
                    if(getIdFromUrl(link.evolves_to[i]!.species.url) === props.id) { //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `i` is a known valid index for `link.evolves_to`.
                        nextInLine = link.evolves_to[i]!; //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `i` is a known valid index for `link.evolves_to`.
                        break;
                    }
                }
            }
            addToLine(nextInLine);
        };
        addToLine(chain);
        return line;
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const line = chainToLine(props.chain);
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
