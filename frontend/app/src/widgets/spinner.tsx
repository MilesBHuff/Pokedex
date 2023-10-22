import {FunctionComponent} from 'react';

////////////////////////////////////////////////////////////////////////////////
export const Spinner: FunctionComponent<{inline?: boolean | undefined}> = props => props.inline ? (
    <span className="spinner"></span>
) : (
    <div className="spinner"></div>
);
