const video = document.querySelector("video");

window.navigator.mediaDevices.getUserMedia({
	audio:true,
	video:{
		width:1280,height:720
	}
})
.then(stream => {
	console.log(stream);
	// let url = window.URL.createObjectURL(stream);
	// console.log(url);
	video.srcObject = stream;
	video.play()
})
.catch(err => {
	console.log(err);
})