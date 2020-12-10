var CreateDiv = function(html){
	this.html = html;
	this.init();
}
CreateDiv.prototype.init = function(){
	let div = document.createElement("div");
	div.innerText = this.html;
	document.body.appendChild(div);
}

// 负责管理单例的逻辑移到了代理类ProxySingletonCreateDiv中。
var ProxySingletonCreateDiv = (function(){	
	let instance = null;
	return function(html){
		if(!instance) {
			instance = new CreateDiv(html);
		}
		return instance;
	}
})()

let hello = new ProxySingletonCreateDiv('hello');
let world = new ProxySingletonCreateDiv('world');
console.log(hello == world);