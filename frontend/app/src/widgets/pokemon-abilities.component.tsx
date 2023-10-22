import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {PokemonAbility} from 'pokenode-ts';
import {Fragment, FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const PokemonAbilitiesComponent: FunctionComponent<{abilities: ReadonlyArray<PokemonAbility>}> = props => <>
    {[...props.abilities].sort((a, b) => a.ability.name.localeCompare(b.ability.name)).map((ability, index) => <Fragment key={index}>
        {displayifyName(ability.ability.name)}
        {index < props.abilities.length - 1 ? ', ' : ''}
        {index === props.abilities.length - 1 && props.abilities.length > 1 ? '.' : ''}
    </Fragment>)}
</>;
