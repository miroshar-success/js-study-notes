const oBtn = document.querySelector(".btn");
// document.execCommand("selectAll");	全选

oBtn.onclick = function() {
	document.execCommand("copy");	// 复制
}

// document.dsignMode = 'on';
const oCut = document.querySelector(".cut");

oCut.onclick = function() {
	document.execCommand('cut');
}
