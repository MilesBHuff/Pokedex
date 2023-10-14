import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import App from "./app/app";
import {store} from "./app/redux/store";
import "./styles/_.scss";

////////////////////////////////////////////////////////////////////////////////
try {
    const root = document.getElementById("root");
    if(!root) throw new ReferenceError('No root element!');

    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
    );
} catch(error) {
    console.error(error);
}
