window.onhashchange = function(event){
	console.log("hash 改变了",event.newURL,event.oldURL);
	console.log('hash',window.location.hash);
}

const btn = document.querySelector(".button");
console.log(btn)
btn.onclick = function(){
	console.log('点击了')
	window.location.hash = 'box';
}