const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
// scale() 放大, 原点位置也会进行移动
ctx.strokeStyle = 'red';
ctx.strokeRect(0,0,50,50);
ctx.stroke();
ctx.strokeStyle = 'red';
ctx.strokeRect(5,5,100,100);
ctx.stroke();
ctx.scale(2,2);
ctx.strokeRect(0,0,50,50);
ctx.stroke();

// rotate()
let rotate = 0;
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext('2d');
function draw(){
	ctx1.clearRect(0,0,300,150);
	ctx1.fillStyle = 'red';
	ctx1.rotate(rotate*Math.PI/180);
	ctx1.fillRect(50,5,100,50);
	ctx1.fill();
	// setTimeout(() => {
	// 	rotate+=5;
	// 	draw();
	// },1000);
}
draw();

// translate();
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
ctx2.fillStyle = 'red';
ctx2.fillRect(10,10,100,50);
ctx2.fill();
// 重置起点为 110,60
ctx2.translate(110,60);
ctx2.fillStyle = 'green';
ctx2.fillRect(0,0,100,50);
ctx2.fill()