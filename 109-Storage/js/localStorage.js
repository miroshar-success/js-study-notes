/*
* localStorage属性允许访问一个Document的对象Storage;其存储的数据能在跨浏览器会话保留。
* localStorage中的键值对总是以字符串的形式存储。
* 方法:
* 新增一个项
* 1. Storage.setItem();
* 读取localStorage项
* 2. Storage.getItem()
*移除项
* 3. Storage.removeItem()
* 清空
* 4. Storage.clear()
* */
add.onclick = function(){
	let userInfo = {
		"name":'jayk',
		"sex":"male",
		"age":"26"
	};
	localStorage.setItem("userInfo", JSON.stringify(userInfo) );
	localStorage.setItem("province","hangzhou");
	localStorage.setItem("phone","apple");
	console.log("存储成功");
};
get.onclick = function(){
	let info = localStorage.getItem("userInfo");
	console.group('localStorage.getItem');
	console.log('JSON.parse前:',typeof info,info);   // String
	console.log("JSON.parse后:",typeof JSON.parse(info),JSON.parse(info));   // Object
	console.log(localStorage.getItem("province"),localStorage.getItem("phone"));
	console.groupEnd();
}

remove.onclick = function(){
	console.group("localStorage.removeItem");
	localStorage.removeItem("userInfo");
	console.log( '删除userInfo后获取该值',JSON.parse(localStorage.getItem("userInfo")) );
	console.groupEnd();
}
clear.onclick = function(){
	console.group('localStorage.clear');
	console.log(localStorage.clear());
	console.log("删除成功");
	console.groupEnd();
}

const oText = document.querySelector('.text');
const oColor = document.querySelector('.color');
const oSelect = document.querySelector('.font');

oSelect.addEventListener('change',(event) => {
	event = event || window.event;
	oText.style.fontFamily = event.target.value;
	window.localStorage.setItem('font',event.target.value);
});

oColor.addEventListener('change',(event) => {
	event = event || window.event;
	document.body.style.backgroundColor = event.target.value;
	window.localStorage.setItem('color',event.target.value);
});

function setStyle() {
	if(window.localStorage.getItem('color')){
		let color = window.localStorage.getItem('color');
		let font = window.localStorage.getItem('font');
		document.body.style.backgroundColor = color;
		oText.style.fontFamily = font;
		oSelect.value = font;
		oColor.value = color;
	}else{
		let currentColor = oColor.value;
		let currentFont = oSelect.value;
		document.body.style.backgroundColor = currentColor;
		oText.style.fontFamily = currentFont;
	}
}
setStyle();