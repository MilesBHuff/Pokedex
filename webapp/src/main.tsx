import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import App from "./app/App";
import {store} from "./app/redux/store";
import "./styles/_.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
