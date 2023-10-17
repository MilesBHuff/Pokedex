import {FunctionComponent} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Home: FunctionComponent = () => {

    const totalPokemonInDex = 1017; // As of gen9.
    const randomPokemonId = Math.floor(Math.random() * totalPokemonInDex);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <section id="home">
            <h2>
                Welcome to my custom Pokédex!
            </h2><p>
                Feel free to search for Pokémon by name using the searchbar in the top-right corner.
            </p><p>
                Alternatively, <Link to={`/pokemon?id=${randomPokemonId}`}>click here</Link> to view a random Pokémon.
            </p><p className="notelet">
                The source code for this application can be found <a href="https://github.com/MilesBHuff/Pokedex">here</a>.
            </p>
        </section>
    );
};
