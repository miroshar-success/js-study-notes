# 单例模式

```js
// demo 用代理实现单例模式
function CreateDiv(message){
	this.message = message;
	this.init();
}
CreateDiv.prototype.init = function(){
	let div = document.createElement("div");
	div.textContent = this.message;
	document.body.appendChild(div);
}

const singletonCreateDiv = (function(){
	let instance = null;
	return function(message){
		if(!instance) {
			instance = new CreateDiv(message);
		}
		return instance;
	}
})()
let m1 = singletonCreateDiv('hello');
let m2 = singletonCreateDiv('world');
```
	
	
	