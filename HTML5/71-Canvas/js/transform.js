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
ctx2.fill();


const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
ctx3.translate(75,75);

function drawCircle(){
	for(let i = 0; i < 12; i++){
		ctx3.save();
		ctx3.rotate( 30*i*(Math.PI/180) );
		ctx3.fillStyle = 'red';
		ctx3.fillRect(-2,-60,4,8);
		ctx3.restore();
	}
}
drawCircle();

// scale方法 会在x , y方向放大图形尺寸,原点位置也会同样改变
const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
ctx4.save();
ctx4.scale(10,3);
ctx4.fillStyle = 'red';
ctx4.fillRect(1,10,10,10);
ctx4.restore();
ctx4.fillStyle = 'green';
ctx4.fillRect(10,30,100,30);

ctx4.scale(-1,1);
ctx4.fillStyle = 'deeppink';
ctx4.font = '30px serif';
ctx4.fillText('hello world!',-150,70)