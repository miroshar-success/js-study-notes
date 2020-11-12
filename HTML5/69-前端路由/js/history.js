let createButton = function(text) {
	let button = document.createElement('button');
	button.textContent = text;
	document.body.appendChild(button);
	return button;
}
let btn1 = createButton('go');
let btn2 = createButton('back');
let btn3 = createButton('forward');

btn1.onclick = function(){
	window.history.go(1);
}
btn2.onclick = function(){
	window.history.back();
}
btn3.onclick = function(){
	window.history.forward();
}

// pushState方法,向当前浏览器会话的历史堆栈中添加一个状态(state)。
let btn4 = createButton('pushState');
btn4.onclick = function(){
	let state = {
		name:'jayk'
	}
	window.history.pushState(state,'1','/www.baidu.com');	// '/' 跳转到当前目录根路径，不加/ 相对于当前路径
}

// 即使hash一直没变,也会一直添加历史记录
let btn5 = createButton('pushState不会引起hashchange');
btn5.onclick = function(){
	window.history.pushState('hash','1','#123');
	console.log(window.history.length);
}

window.onhashchange = function(){
	console.log('监听hash改变');
}

let btn6 = createButton('改变hash');
btn6.onclick = function() {
	window.location.hash = '#hello';
	console.log(window.history.length);	// 一直改变hash也不会 重复添加history
}


let btn7 = createButton('replaceState');
btn7.onclick = function(){
	let state = {name:'kyrie'}
	window.history.replaceState(name,'123','foo.html');
	console.log(window.history.length);
}

window.onpopstate = function(event){
	console.log('popstate事件触发了',event);
}

let hr = document.createElement("hr");
document.body.appendChild(hr);

let btn8 = createButton('pushState');
let btn9 = createButton('replaceState');

// popstate 只有在 history.back()/history.go()/history.forward()才会触发,进入当前历史条目时会输出state
btn8.onclick = function(){
	window.history.pushState({name:"pushState"},'title1','pushState');
}
btn9.onclick = function(){
	window.history.pushState({name:'replaceState'},'title2','replaceState');
}

let btn10 = createButton('go=0');	// go=0 表示刷新当前页面
btn10.onclick = function(){
	window.history.go(0);
}

window.onload = function(){
	console.log("onload事件");
}
window.onpopstate = function(){
	console.log("onpopstate");
}