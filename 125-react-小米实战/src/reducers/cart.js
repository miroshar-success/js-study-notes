// 购物车功能,增加,减少,删除商品,不同的操作返回不同的state
import shopTools from "../utils/index.js"
export default function cart(state={},action){
    // 获取商品的数据 {id:number}的形式 传递给工具函数,
    let goods = action.data;
    let id = action.id
    switch(action.type){
        case "ADD_CART":
            shopTools.updateGoods(goods);
            return shopTools.getAll();
        case "DELETE_GOOD":
            shopTools.deleteGoods(id);
            return shopTools.getAll();
        case "TOTAL_NUMBER":
            let newState = Object.assign({},state,goods);
            console.log(newState);
            return newState;
        default:
            return shopTools.getAll();
    }
}