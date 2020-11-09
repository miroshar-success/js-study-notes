window.navigator.getUserMedia({video:true,audio:true},function(stream){
	console.log(stream);
	var video = document.querySelector("video");
	video.src = window.URL.createObjectURL(stream);
	video.onloadedmetadata = function() {
		video.play();
	}
},function(error) {
	console.log(error);
})