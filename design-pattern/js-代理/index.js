const flower = '玫瑰花';

var xiaoming = {
	sendFlower:function(target){
		target.receiveFlower(flower);
	}
}

var B = {
	receiveFlower:function(flower){
		girl.receiveFlower(flower)
	}
}

var girl = {
	receiveFlower:function(flower){
		console.log("收到花:",flower);
	}
}
// xiaoming.sendFlower(girl);
xiaoming.sendFlower(B);


var jay = {
	sendFlower:function(proxy){
		proxy.receiveFlower(flower);
	}
}
// 代理中可以过滤一些请求。 
// 虚拟代理: 把一些开销很大的对象,延迟到真正需要的时候才去创建,虚拟代理
var proxy = {
	receiveFlower:function(flower){
		beauty.listenGoodMood(function(){
			beauty.receiveFlower(flower);
		})
	}
}

var beauty = {
	receiveFlower:function(flower){
		console.log('收到花:',flower);
	},
	listenGoodMood:function(fn){
		setTimeout(fn,2000)
	}
}
jay.sendFlower(proxy);