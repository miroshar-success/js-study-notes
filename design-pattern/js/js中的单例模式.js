// 惰性单例,在使用的时候才创建
function CreateDiv(message){
	this.message = message;
	this.init();
}
CreateDiv.prototype.init = function(){	// 惰性单例,在使用的时候才创建
	let div = document.createElement('div');
	div.textContent = this.message;
	document.body.appendChild(div);
}
CreateDiv.getInstance = (function(){
	let instance = null;
	return function(message){
		if(!instance){
			instance = new CreateDiv(message);
		}
		return instance;
	}
})();

let message_1 = CreateDiv.getInstance('hello');
let message_2 = CreateDiv.getInstance('world');	

// 上面的方法是基于类的单例模式,在js中并不适用

