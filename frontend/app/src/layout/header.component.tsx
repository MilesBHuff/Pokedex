import {SearchBarComponent} from '@/widgets/search-bar.component.tsx';
import type {FunctionComponent, MouseEventHandler} from 'react';
import {Link} from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////
export const HeaderComponent: FunctionComponent = () => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
        (document.activeElement as ((HTMLElement & Partial<HTMLInputElement>) | undefined))?.blur?.();
    };

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        <header id="header">
            <div className="brandmark">
                <img src="/favicon.svg" />
                <h1><Link to="/" onClick={handleClick}>Miles's Pokédex</Link></h1>
            </div>
            <SearchBarComponent />
        </header>
    );
};
