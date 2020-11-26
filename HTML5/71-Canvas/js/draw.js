const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image();
image.onload = drawImage;
image.src = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3779101858,2365354695&fm=26&gp=0.jpg';
function drawImage(){
		ctx.drawImage(this,0,0);
}

const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');

function draw(){
	var image = new Image();
	image.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
	image.onload = function(){
		var pattern = ctx.createPattern(image,'repeat');
		ctx1.fillStyle = pattern;
		ctx1.fillRect(0,0,300,150);
	}
}
draw();


const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas1.getContext('2d');
const video = document.querySelector('video');
// 绘制视频时不断调用自身
function draw_video(){
	ctx2.drawImage(video,0,0,300,200);
	window.requestAnimationFrame(draw_video);
}
draw_video()