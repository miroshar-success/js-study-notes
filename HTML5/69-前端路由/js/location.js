let createButton = function(text) {
	let button = document.createElement('button');
	button.textContent = text;
	document.body.appendChild(button);
	return button;
}

let btn1 = createButton('导航到新页面');
let btn2 = createButton('重载页面');
let btn3 = createButton('replace');
let btn4 = createButton("search");
let btn5 = createButton("获取search值");

btn1.onclick = function() {
	// window.location.assign("http://www.baidu.com");
	window.location.href = 'http://www.qq.com';
}
btn2.onclick = function(){
	window.location.reload(true);
}

btn3.onclick = function() {
	let pathname = window.location.pathname;
	console.log(window.location);
	// window.location.replace('http://www.baidu.com#',pathname);
}

btn4.onclick = function(){
	console.log(window.location.search);
}

let obj = {}
btn5.onclick = function(){
	console.log('search:',window.location.search);
	if(window.location.search.length > 1) {
		let search = window.location.search.substring(1);
		for(let i = 0, group = search.substring(1).split("&"),length = group.length; i < length; i++){
			let temp = group[i].split('=');
			obj[decodeURIComponent(temp[0])] = temp.length > 1 ? decodeURIComponent(temp[1]) : "";
		}
	}
	console.log('search-object:',obj);
}






