const oContainer = document.querySelector(".container");
const oUl = document.querySelector(".list");
const aLi = document.querySelectorAll(".list>li");
aLi.forEach((item,index)=>{
	item.setAttribute("draggable",'true');
	// 兼容火狐的操作,拖动开始时在拖动开始时设置 dataTransfer操作
	item.ondragstart = function(e){
		console.log(e.dataTransfer);
		e.dataTransfer.setData("item",index);
		e.dataTransfer.setDragImage(oImg,-20,-20);
	}
});
oContainer.ondragenter = function(){
	this.innerText = "请释放鼠标";
}
oContainer.ondragover = function(e){
	e.preventDefault();
}
oContainer.ondragleave = function(){
	this.innerText = "将元素拖入此处";
}
oContainer.ondrop = function(e){
	console.log(e.dataTransfer.getData("item"));
	oUl.removeChild(aLi[e.dataTransfer.getData("item")]);
}