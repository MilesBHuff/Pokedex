import {useEvolutionsByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {EvolutionLine} from '@/widgets/evolutions-viewer/evolution-line.tsx';
import {Spinner} from '@/widgets/spinner.tsx';
import {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const EvolutionsViewer: FunctionComponent<{
    evolutionId: number,
    speciesId?: number | undefined,
}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const {data: evolutions, error: evolutionsError, isLoading: evolutionsLoading} = useEvolutionsByIdQuery(props.evolutionId);
    // useEffect(() => console.debug(evolutions), [evolutions]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        evolutionsLoading ? (
            <Spinner />
        ) : evolutionsError ? (
            <span className="error">Failed to load data!</span>
        ) : !evolutions ? (
            'No data!'
        ) : (
            <span className="evolutions-viewer">
                <EvolutionLine initialChainLink={evolutions.chain} speciesId={props.speciesId} />
            </span>
        )
    );
};
