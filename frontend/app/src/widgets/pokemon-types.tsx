import {displayifyName} from '@/utility/displayify-name.function.ts';
import {PokemonType} from 'pokenode-ts';

////////////////////////////////////////////////////////////////////////////////
export const PokemonTypes = (props: {types: Array<PokemonType>}) => (
    <ul className="pokemon-types">
        {props.types.map((type, index) => (
            <li key={index} className={type.type.name}>
                {displayifyName(type.type.name)}
            </li>
        ))}
    </ul>
);
