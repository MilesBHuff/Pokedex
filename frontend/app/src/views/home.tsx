import {FunctionComponent, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
const totalPokemonInDex = 1017; // As of gen9.

////////////////////////////////////////////////////////////////////////////////
export const Home: FunctionComponent = () => {

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
                <br/>
                Alternatively, <Link to={`/pokemon?id=${randomPokemonId}`}>click here</Link> to view a random Pokémon.
            </p><p className="notelet">
                The source code for this application can be found <a href="https://github.com/MilesBHuff/Pokedex">here</a>.
            </p>
        </div>
    );
};
