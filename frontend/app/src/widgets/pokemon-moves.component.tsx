import {displayifyName} from '@/utilities/displayify-name.function.ts';
import type {PokemonMove} from 'pokenode-ts';
import type {FunctionComponent} from 'react';
import {Fragment} from 'react';

////////////////////////////////////////////////////////////////////////////////
//TODO: Display in a table.
export const PokemonMovesComponent: FunctionComponent<{
    moves: ReadonlyArray<PokemonMove>,
}> = props => <>
    {[...props.moves].sort((a, b) => a.move.name.localeCompare(b.move.name)).map((move, index) => <Fragment key={index}>
        {displayifyName(move.move.name)}
        {index < props.moves.length - 1 ? ', ' : ''}
        {index === props.moves.length - 1 && props.moves.length > 1 ? '.' : ''}
    </Fragment>)}
</>;
