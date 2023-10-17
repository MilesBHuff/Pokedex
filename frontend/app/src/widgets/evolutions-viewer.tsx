import {useEvolutionsByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {FunctionComponent, useEffect} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const EvolutionsViewer: FunctionComponent<{id: number;}> = props => {
    const {data: evolutions, error, isLoading: loading} = useEvolutionsByIdQuery(props.id);
    useEffect(() => console.debug(evolutions), [evolutions]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return <>
        {loading ? <>
            {/* Load silently. */}
        </> : error ? <>
            {/* Fail silently. */}
        </> : !evolutions ? <>
            {/* Fail silently. */}
        </> : <>
            <ul className="evolutions-viewer">
                {/* TODO */}
            </ul>
        </>}
    </>;
};
