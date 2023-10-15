import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const SearchBar = () => {
    
    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);

    const validityRegex = /[A-Z\d]+/i;

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setValid((event.target.value.match(validityRegex)?.length ?? NaN) > 0);
    }

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/pokemon'); //TODO: Specify which Pokémon in a URL parameter.
    }

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" value={value} onChange={handleChange}/>
            <button type="submit" disabled={!valid}>🔍</button>
        </form>
    );
};
