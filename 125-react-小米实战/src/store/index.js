import {createStore} from "redux";
import Reducers from "../reducers/index.js"
export const store = createStore(
    Reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)