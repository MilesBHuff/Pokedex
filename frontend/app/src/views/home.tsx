import {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const Home: FunctionComponent = () => (
    <section id="home">
        <h2>
            Welcome to my custom Pokédex!
        </h2>
        <p>
            Feel free to search for Pokémon by name using the searchbar in the top-right corner.
        </p>
        <p className="notelet">
            The source code for this application can be found <a href="https://github.com/MilesBHuff/Pokedex">here</a>.
        </p>
    </section>
);
