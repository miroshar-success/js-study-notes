// 使用一个变量来标志当前是否已经为某个类创建过对象
var Player = function(name){
	this.name = name;
}
Player.instance = null;

Player.prototype.sayName = function(){
	console.log(this.name);
}

Player.getInstance = function(name){
	if(!this.instance) {
		this.instance = new Player(name);
	}
	return this.instance;
}

var a = Player.getInstance('seven1');
var b = Player.getInstance('seven2');

console.log(a == b, 'a:',a,'b:',b);


var Singer = function(name){
	this.name = name;
}
Singer.prototype.get_name = function(name){
	console.log(this.name);
}
Singer.getInstance = (function(){
	var instance = null;
	return function(name){
		if(!instance){
			instance = new Singer(name);
		}
		return instance;
	}
})()

let lee = Singer.getInstance('lee');
let jay = Singer.getInstance('jay');

jay.get_name();
lee.get_name()

console.log(jay == lee, jay, lee);
console.log(jay.__proto__ == Singer.prototype);
console.log(lee.__proto__ == Singer.prototype);

// 透明的单例
var createDiv = (function(){
	var instance;
	var createDiv = function(html){
		if(instance) {
			return instance;
		}
		this.html = html;
		this.init();
		return instance = this;
	}
	createDiv.prototype.init = function(){
		var div = document.createElement('div');
		div.innerHTML = this.html;
		document.body.appendChild(div);
	}
	return createDiv;
})();



