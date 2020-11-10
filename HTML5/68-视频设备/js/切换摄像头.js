let mode = 'user';
const btn = document.querySelector('.button');
let constrains = {
		audio:true,
		video:{
			width:1280,
			height:720,
			facingMode:mode,
			frameRate:{
				ideal:1		// 帧率
			}
		}
};;

btn.onclick = function() {
	mode = mode == 'user' ? 'environment' : 'user';
	constrains = {audio:true,video:{
		width:1280,
		height:720,
		facingMode:mode,
	}};
}

window.navigator.mediaDevices.getUserMedia(constrains).then(stream => {
	const video = document.querySelector("video");
	if('srcObject' in video) {
		video.srcObject = stream;
	}else{
		video.src = window.URL.createObjectURL(stream);
	}
	video.onloadedmetadata = function() {
		video.play();
	}
});

