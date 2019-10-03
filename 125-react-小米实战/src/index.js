import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./css/reset.css"
import {Provider} from "react-redux"
import {store} from "./store/index.js"
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
