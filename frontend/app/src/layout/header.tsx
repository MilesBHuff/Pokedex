import {SearchBar} from '@/widgets/search-bar';
import {FunctionComponent, MouseEventHandler} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const Header: FunctionComponent = () => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
        (document.activeElement as ((HTMLElement & Partial<HTMLInputElement>) | undefined))?.blur?.();
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <header>
            <div className="brandmark">
                <img src="/favicon.svg" />
                <h1><Link to="/" onClick={handleClick}>Miles's Pokédex</Link></h1>
            </div>
            <SearchBar />
        </header>
    );
};
