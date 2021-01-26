var create_image = (function(){
	let img = document.createElement('img');
	document.body.appendChild(img);
	return {
		setSrc:function(src){
			img.src = src;
		}
	}
})()

let url = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1405513753,2858193846&fm=26&gp=0.jpg";

var proxyImage = (function(){
	var img = new Image();
	img.onload = function(){
		create_image.setSrc(this.src);
	}
	return {
		setSrc:function(src) {
			create_image.setSrc('/js/images/timg.gif');
			img.src = src;
		}
	}
})()
proxyImage.setSrc(url);


