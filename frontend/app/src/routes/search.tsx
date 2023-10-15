import {useSearchParams} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    return (
        <section>
            <p>{query}</p>
        </section>
    );
};
