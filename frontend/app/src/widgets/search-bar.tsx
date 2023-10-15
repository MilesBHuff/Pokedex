import {useAppDispatch} from '@/redux/hooks.ts';
import {searchSlice} from '@/redux/slices/search.slice.ts';
import {ChangeEvent, FormEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const SearchBar = () => {

    const dispatch = useAppDispatch();
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
        setValid(false);
        dispatch(searchSlice.actions.addToHistory(value));
        setValue('');
        setSearching(false);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleReset = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue('');
        setValid(false);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <form className="search-bar" onSubmit={handleSubmit} onReset={handleReset}>
            <button className="reset" type="reset" disabled={searching || value.length <= 0}>🗙</button>
            <input className="input" type="text" disabled={searching} placeholder="Search" value={value} onChange={handleChange} />
            <button className="submit" type="submit" disabled={searching || !valid}>🔍</button>
        </form>
    );
};
