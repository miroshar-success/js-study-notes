// 获取存储地址的工具
import userTools from "../utils/user.js"
export default function user(state={},action){
    switch(action.type){
        case "ADD_ADDRESS":
            let address = action.address;
            userTools.addAddress(address);
            return Object.assign({},state,userTools.getAddress());
        case "GET_ADDRESS":
            let newState = Object.assign({},state,userTools.getAddress());
            return newState;
        default:
            return Object.assign({},state,userTools.getAddress());
    }
}