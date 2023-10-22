import {FunctionComponent} from 'react';
import {FallbackProps} from 'react-error-boundary';

////////////////////////////////////////////////////////////////////////////////
export const ReactErrorComponent: FunctionComponent<FallbackProps> = props => (
    <div id="error" className="error view">
        <h2>Unexpected Application Error!</h2>{/* Same title as used by the default error page. */}
        <p>{props.error.message}</p>
        <pre className="raw-data">{props.error.stack}</pre>
        <button type="button" className="button-primary" onClick={props.resetErrorBoundary}>Retry</button>
    </div>
);
