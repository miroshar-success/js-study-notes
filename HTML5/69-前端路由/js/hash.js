window.onhashchange = function(event){
	console.log("hash 改变了",event.newURL,event.oldURL);
	console.log('hash',window.location.hash);
}

