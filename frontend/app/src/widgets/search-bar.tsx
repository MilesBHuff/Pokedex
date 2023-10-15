import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const SearchBar = () => {

    const navigate = useNavigate();
    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [searching, setSearching] = useState(false);

    const validityRegex = /[A-Z\d]+/i;

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setValid((event.target.value.match(validityRegex)?.length ?? NaN) > 0);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSearching(true);
        navigate(`/search?q=${value}`);
        setValue('');
        setValid(false);
        setSearching(false);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input type="text" disabled={searching} placeholder="Search" value={value} onChange={handleChange} />
            <button type="submit" disabled={searching || !valid}>🔍</button>
        </form>
    );
};
