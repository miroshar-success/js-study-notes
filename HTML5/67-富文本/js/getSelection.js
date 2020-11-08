const btn = document.querySelector('.copy');
// 复制一张本地图片
var node = document.getElementById('foo');
btn.addEventListener('click',() => {
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(node);
	selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand("copy");
},false);


