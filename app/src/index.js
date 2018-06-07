import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import reducers from "./_reducers";
import App from "./App";

const theme = createMuiTheme();
const enhancer = applyMiddleware(thunk);
const store = createStore(reducers, {}, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter
            basename={process.env.REACT_APP_BASE_URL}
            forceRefresh={!("pushState" in window.history)}
        >
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();
