// 定义不同的action,返回的都是一个对象,type为对商品的不同操作
export function addCart(data){
    return {
        type:"ADD_CART",
        data
    }
}
export function getAll(data){
    return{
        type:"GET_ALL",
        data
    }
}
export function deleteGoods(id){
    return{
        type:"DELETE_GOOD",
        id
    }
}
export function totalNumber(data){
    return{
        type:"TOTAL_NUMBER",
        data
    }
}

