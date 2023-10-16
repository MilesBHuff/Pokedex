import {useAppDispatch, useAppSelector} from '@/redux/hooks.ts';
import {searchSlice} from '@/redux/slices/search.slice.ts';
import {ChangeEventHandler, FormEventHandler, MouseEventHandler, useState} from 'react';
import {useNavigate} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const SearchBar = () => {

    const dispatch = useAppDispatch();
    const history = useAppSelector(state => state.search.history);
    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [searching, setSearching] = useState(false);

    const validityRegex = /[A-Z\d]+/i;

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
        setValue(event.target.value);
        setValid((event.target.value.match(validityRegex)?.length ?? NaN) > 0);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        setSearching(true);
        navigate(`/search?q=${value}`);
        setValid(false);
        dispatch(searchSlice.actions.addToHistory(value));
        setValue('');
        setSearching(false);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleReset: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        setValue('');
        setValid(false);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleSelection: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setValue(event.currentTarget.innerHTML);
        setValid(true);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <form className="search" onSubmit={handleSubmit} onReset={handleReset}>

            <div className="search-bar">
                <button className="reset" type="reset" disabled={searching || value.length <= 0}>🗙</button>
                <input className="input" type="text" disabled={searching} placeholder="Search" value={value} onChange={handleChange} />
                <button className="submit" type="submit" disabled={searching || !valid}>🔍</button>
            </div>

            {history.length <= 0 ? null :
                <ul className="history">{
                    history.map((entry, index) => (
                        <li key={index}>
                            <button type="button" onMouseDown={handleSelection}>{entry}</button>
                        </li>
                    ))
                }</ul>
            }
        </form>
    );
};
