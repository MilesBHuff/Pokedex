import {displayifyName} from '@/utilities/displayify-name.function.ts';
import {PokemonMove} from 'pokenode-ts';
import {Fragment, FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const PokemonMoves: FunctionComponent<{moves: ReadonlyArray<PokemonMove>}> = props => <>
    {[...props.moves].sort((a, b) => a.move.name.localeCompare(b.move.name)).map((move, index) => <Fragment key={index}>
        {displayifyName(move.move.name)}
        {index < props.moves.length - 1 ? ', ' : ''}
        {index === props.moves.length - 1 && props.moves.length > 1 ? '.' : ''}
    </Fragment>)}
</>;
