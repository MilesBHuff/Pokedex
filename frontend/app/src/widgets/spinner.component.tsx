import type {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const SpinnerComponent: FunctionComponent<{inline?: boolean | undefined}> = props => props.inline ? (
    <span className="spinner"></span>
) : (
    <div className="spinner"></div>
);
