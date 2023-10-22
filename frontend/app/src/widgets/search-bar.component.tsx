import {useAppSelector} from '@/redux/hooks.ts';
import {selectHistory} from '@/redux/slices/search.slice.ts';
import {ChangeEventHandler, FormEventHandler, FunctionComponent, MouseEventHandler, useState} from 'react';
import {useNavigate} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const SearchBarComponent: FunctionComponent = () => {

    const history = useAppSelector(selectHistory);
    const navigate = useNavigate();

    const [value, setValue] = useState('');
    const [valid, setValid] = useState(false);
    const [searching, setSearching] = useState(false);

    const validityRegex = /[A-Z\d]+/i;

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const getInputElement = () => (
        document.getElementsByClassName('input')?.[0] ?? null
    ) as HTMLInputElement | null;

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
        setValue('');
        setSearching(false);
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleReset: FormEventHandler<HTMLFormElement> = event => {
        event.preventDefault();
        setValue('');
        setValid(false);

        const input = getInputElement();
        if(input) input.focus(); // Ensure the input is re-focused so that the user may type something new after clearing.
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleSelection: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();
        setValue(event.currentTarget.innerHTML);
        setValid(true);

        const input = getInputElement();
        if(input) {
            input.focus(); // Ensure the input is re-focused so that the user may easily submit the form with "Enter", or proceed to edit their selection.
            // input.select(); // Select the text, to make it easy for the user to copy, delete, or skip to the beginning/end. //WARN: Is not preserved when the `value` is changed by other functions. //TODO: Find a way to get this to work for changèd values.
        }
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
                            <button type="button" onClick={handleSelection}>{entry}</button>
                        </li>
                    ))
                }</ul>
            }
        </form>
    );
};
