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

let hello = new ProxySingletonCreateDiv('hello');	// ? 为什么此处要new ProxySingletonCreateDiv
let world = new ProxySingletonCreateDiv('world');
console.log(hello == world);



function CreateSinger(name){
	this.name = name;
	this.init()
}
CreateSinger.prototype.init = function(){
	console.log(this.name);
}

const ProxySingletonSinger = (function(){
	let instance = null;
	return function(name){
		if(!instance){
			instance = new CreateSinger(name);
		}
		return instance;
	}
})();

// let singer = new ProxySingletonSinger('jay');
// console.log('singer:',singer);
let singer = ProxySingletonSinger('jay');
console.log(singer,singer.__proto__ == CreateSinger.prototype);
let jay = ProxySingletonSinger('proxy');
console.log('jay:',jay);



function CreateMessage(message){
	this.message = message;
	this.init();
}
CreateMessage.prototype.init = function(){
	let div = document.createElement('div');
	div.textContent = this.message;
	document.body.appendChild(div);
}

let message_1 = new CreateMessage('hello');
let message_2 = new CreateMessage('world');
console.log(message_1,message_2,message_1 == message_2);

function SingletonMessage(message){
	let instance = null;
	if(!instance){
		instance = new CreateMessage(message);
	}
	return instance;
}

let m_1 = SingletonMessage('你好');
let m_2 = SingletonMessage("世界");


let singletonMessage = (function (){
	let instance = null;
	return function(message){
		if(!instance){
			instance = new CreateMessage(message);
		}
		return instance;
	}
})()
let message_11 = singletonMessage('我是插入的第一条消息');
let message_21 = singletonMessage('我是插入的第二条消息');
console.log(message_11 == message_21)	// true;
console.log(typeof message_11);

