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

create_image.setSrc(url);