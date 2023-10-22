import {displayifyName} from '@/utilities/displayify-name.function';
import type {PokemonType} from 'pokenode-ts';
import type {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const PokemonTypesComponent: FunctionComponent<{types: Array<PokemonType>}> = props => (
    <ul className="pokemon-types">
        {props.types.map((type, index) => (
            <li key={index} className={type.type.name}>
                {displayifyName(type.type.name)}
            </li>
        ))}
    </ul>
);
