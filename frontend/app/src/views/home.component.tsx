import {totalPokemonInDex} from '@/consts.ts';
import type {FunctionComponent} from 'react';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const HomeComponent: FunctionComponent = () => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const [randomPokemonId, setRandomPokemonId] = useState(NaN);
    const calculateRandomPokemonId = (): void => {
        setRandomPokemonId(Math.floor(Math.random() * totalPokemonInDex));
    };
    useEffect(calculateRandomPokemonId, []);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <div id="home" className="view">
            <h2>
                Welcome to my custom Pokédex!
            </h2><p>
                Feel free to search for Pokémon by name using the searchbar in the top-right corner.
                <br />
                Alternatively, <Link to={`/pokemon?id=${randomPokemonId}`}>click here</Link> to view a random Pokémon.
            </p><p className="notelet">
                The source code for this application can be found <a href="https://github.com/MilesBHuff/Pokedex">here</a>.
            </p>
        </div>
    );
};
