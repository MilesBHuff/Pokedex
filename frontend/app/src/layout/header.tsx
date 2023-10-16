import {SearchBar} from '@/widgets/search-bar';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Header = () => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleClick = () => {
        (document.activeElement as ((HTMLElement & Partial<HTMLInputElement>) | undefined))?.blur?.();
    }

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <header>
            <div className="brandmark">
                <img src="/favicon.svg"/>
                <h1><Link to="/" onClick={handleClick}>Pokédex (unofficial)</Link></h1>
            </div>
            <SearchBar />
        </header>
    );
};
