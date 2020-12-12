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

// 创建一个登陆框，这种方式一开始就创建了DOM节点
let button = document.querySelector(".login-button");
let wrapper = document.querySelector(".wrapper");

// const loginLayer = (function(){
// 	let div = document.createElement("div");
// 	div.classList.add('content');
// 	wrapper.appendChild(div);
// })()

let createLogin = function(){
	let div = document.createElement("div");
	div.classList.add('content');
	wrapper.appendChild(div);
}

// 虽然达到了惰性创建div,但是失去了单例的效果,每次点击都会创建一个div
// button.addEventListener('click',function(){
// 	// wrapper.style.display = 'block';
// 	createLogin();
// 	wrapper.style.display = 'block';
// },false);


// 单例模式,只创建一个div
const createSingleLogin = (function(){
	let div = null;
	return function(){
		if(!div){
			div = document.createElement("div");
			div.classList.add("content");
			wrapper.appendChild(div);
		}
		return div;
	}
})();

// button.addEventListener('click',function(){
// 	createSingleLogin();
// 	wrapper.style.display = 'block';
// },false);


// 通用的惰性单例
var getSingle = function(fn){
	var result;
	return function(){
		console.log('this:',this,arguments,result);
		return result || ( result = fn.apply(this,arguments) );
	}
}

function createLoginLayer(){
	var div = document.createElement('div');
	div.classList.add("content");
	wrapper.appendChild(div);
	return div;
}
let a = getSingle(createLoginLayer);
button.addEventListener('click',function(){
	a(123)
	wrapper.style.display = 'block';
},false);