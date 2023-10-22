import type {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const FooterComponent: FunctionComponent = () => (
    <footer id="footer">
        <p>
            <span>
                Copyright © 2023
            </span> <a href="https://GitHub.com/MilesBHuff" title="Miles Bradley Huff">
                Miles B Huff
            </a>, <a href="https://GitHub.com/MilesBHuff/Pokedex/blob/main/LICENSE.txt" title="Lesser Affero General Public License (v3.0 or later)">
                LAGPL3+
            </a>.
        </p>

        <p>
            <span>
                <i>Pokédex</i>® and <i>Pokémon</i>® are registered trademarks of
            </span> <a href="https://www.Nintendo.com/US" title="Nintendo of America Inc">
                Nintendo
            </a>.
        </p>
    </footer>
);
