// 保存购物车的数据,保存在localStorage中,            商品id对应着数量
// 先从内存中获取商品信息对象,商品的保存形式为goods:{id:number}
let goodsInfo = JSON.parse(window.localStorage.getItem("shopInfo") || "{}")

let shopTools = {
    // 更新/添加商品
    updateGoods:function(goods){
        // 如果有商品id,则把商品数量添加,否则直接添加
        if(goodsInfo[goods.id]){
            goodsInfo[goods.id] += goods.number;
        }else{
            goodsInfo[goods.id] = goods.number;
        }
        this.saveGoods();
    },
    // 删除商品
    deleteGoods:function(id){
        delete goodsInfo[id];
        this.saveGoods();
    },
    saveGoods:function(){
        window.localStorage.setItem("shopInfo",JSON.stringify(goodsInfo));
    },
    getAll:function(){
        return JSON.parse(window.localStorage.getItem("shopInfo") || "{}");
    }
}
export default shopTools;