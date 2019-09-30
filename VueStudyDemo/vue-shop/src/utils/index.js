// 过滤数组重复的品牌和颜色,利用数组的indexOf方法, 如果数组没有这项,则添加
export function getFilterArray(array){
	const temp = [];
	for(let i = 0,len = array.length;i<len; i++){
		if( temp.indexOf(array[i]) === -1 ){
			temp.push(array[i])
		}
	}
	return temp
}

// 将购物车数据每项以对象形式传递{id:id,count:12}
/*
let cartList = JSON.parse( window.localStorage.getItem("cartList") || "[]" );	

Unexpected token u in JSON at position 0  这么写会报错,因为此时cartList是undefined,JSON.parse() 解析undefined 会报下面的错误,
所以先判断一下 是否为undefined,然后再解析
*/

let cartList = window.localStorage.getItem("cartList");
console.log(cartList);
if (cartList == null || undefined){
	cartList = [];
}else{
	cartList = JSON.parse(cartList);
}

export const cartTools = {
	saveGood(cartList){
		window.localStorage.setItem("cartList",JSON.stringify(cartList));
	},
	getAll(){
		return cartList;
	},
	deleteGood(index){
		cartList.splice(index,1);
		this.saveGood(cartList);
	},
	// 更新数据,有可能是增加数据,也有可能是减少数据,默认是增加,传递一个参数默认值是+1, 在购物车页面更新数据时 传递参数,有可能是+1,也有可能是-1
	updateGood(id,count=1){
		let product = cartList.find((item) => item.id == id);
		console.log(product);
		if(product){
			product.count+=count;
		}else{
			cartList.push({
				id,
				count:1
			})
		}
		this.saveGood(cartList);
	}
}