import {combineReducers} from "redux";
import cart from "./cart.js"
import user from "./user.js"
export default combineReducers({
    cart,
    user
})