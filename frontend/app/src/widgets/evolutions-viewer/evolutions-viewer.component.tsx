import {useEvolutionsByIdQuery} from '@/redux/slices/pokeapi.slice.ts';
import {EvolutionLineComponent} from '@/widgets/evolutions-viewer/evolution-line.component.tsx';
import {SpinnerComponent} from '@/widgets/spinner.component.tsx';
import {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const EvolutionsViewerComponent: FunctionComponent<{
    evolutionId: number,
    speciesId?: number | undefined,
}> = props => {

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    const {data: evolutions, error: evolutionsError, isFetching: evolutionsLoading} = useEvolutionsByIdQuery(props.evolutionId);
    // useEffect(() => console.debug(evolutions), [evolutions]);

    //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //  //
    return (
        evolutionsLoading ? (
            <SpinnerComponent inline={true} />
        ) : evolutionsError ? (
            <span className="error">Failed to load data!</span>
        ) : !evolutions ? (
            'No data!'
        ) : (
            <span className="evolutions-viewer">
                <EvolutionLineComponent initialChainLink={evolutions.chain} speciesId={props.speciesId} />
            </span>
        )
    );
};
