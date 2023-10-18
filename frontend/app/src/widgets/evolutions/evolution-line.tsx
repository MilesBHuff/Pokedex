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

            if(link.evolves_to.length <= 1) {
                if(link.evolves_to[0]) addToLine(link.evolves_to[0]);
            } else { //TODO:  Remove the below;  it's only there to assuage the lack of support for trees.  
                // Choosing a random index to at least get some variety.
                const index = Math.floor(Math.random() * (link.evolves_to.length));
                if(link.evolves_to[index]) addToLine(link.evolves_to[index]!); //NOTE: Non-null assertion used to work around issue where TypeScript is unable to know that `index` is a known valid key for `link.evolves_to`.
            }
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
