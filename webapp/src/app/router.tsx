import {Home} from '@/app/routes/home.tsx';
import {Pokemon} from '@/app/routes/pokemon.tsx';
import {BrowserRouter, Route, Routes} from "react-router-dom";

////////////////////////////////////////////////////////////////////////////////
export const Router = () => (
    <>
        <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route path="pokemon" element={<Pokemon />} />
            <Route path="*" element={<Home />} />
        </Routes>
        </BrowserRouter>
    </>
);
