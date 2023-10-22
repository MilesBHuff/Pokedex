import type {PokemonSprites} from 'pokenode-ts';
import type {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const PokemonSpritesComponent: FunctionComponent<{sprites: Readonly<PokemonSprites>}> = props => <>
    {props.sprites.front_default ? (
        <img className="pokemon-sprite" src={props.sprites.front_default} /> // TODO: Add a spinner while the image loads.
    ) : null}
</>;
