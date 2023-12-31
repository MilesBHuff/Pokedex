import {displayifyName} from '@/utilities/displayify-name.function.ts';
import type {PokemonAbility} from 'pokenode-ts';
import type {FunctionComponent} from 'react';
import {Fragment} from 'react';

////////////////////////////////////////////////////////////////////////////////
//TODO: Display in a table.
export const PokemonAbilitiesComponent: FunctionComponent<{
    abilities: ReadonlyArray<PokemonAbility>,
}> = props => <>
    {[...props.abilities].sort((a, b) => a.ability.name.localeCompare(b.ability.name)).map((ability, index) => <Fragment key={ability.ability.name}>
        {displayifyName(ability.ability.name)}
        {index < props.abilities.length - 1 ? ', ' : ''}
        {index === props.abilities.length - 1 && props.abilities.length > 1 ? '.' : ''}
    </Fragment>)}
</>;
