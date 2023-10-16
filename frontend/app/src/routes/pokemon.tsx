import {useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Pokemon = () => {
    const [searchParams] = useSearchParams();
    /** The Pokémon's National 'Dex Number */
    const id = searchParams.get('id');

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <section id="pokemon">
            <p>{id}</p>
        </section>
    );
};
