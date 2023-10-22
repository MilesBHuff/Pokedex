import type {PokemonSprites as PokemonSpritesType} from 'pokenode-ts';
import {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const PokemonSprites: FunctionComponent<{sprites: Readonly<PokemonSpritesType>}> = props => <>
    {props.sprites.front_default ? (
        <img className="pokemon-sprite" src={props.sprites.front_default} /> // TODO: Add a spinner while the image loads.
    ) : null}
</>;
