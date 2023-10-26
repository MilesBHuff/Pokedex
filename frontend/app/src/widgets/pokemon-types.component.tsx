import {displayifyName} from '@/utilities/displayify-name.function';
import type {PokemonType} from 'pokenode-ts';
import type {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const PokemonTypesComponent: FunctionComponent<{
    types: ReadonlyArray<PokemonType>,
}> = props => (
    <ul className="pokemon-types">
        {props.types.map(type => (
            <li key={type.type.name} className={type.type.name}>
                {displayifyName(type.type.name)}
            </li>
        ))}
    </ul>
);
