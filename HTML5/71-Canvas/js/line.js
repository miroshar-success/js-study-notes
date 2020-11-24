const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.lineWidth = 8;
ctx.strokeStyle = 'red';
ctx.moveTo(10,10);
ctx.lineTo(100,10);
ctx.lineCap = 'round';
ctx.stroke();

ctx.beginPath();
ctx.lineWidth = 3;
ctx.strokeStyle = 'blue';
ctx.moveTo(10,30);
ctx.lineTo(100,30);
ctx.stroke();


const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext('2d');
ctx1.lineWidth = 8;
ctx1.lineJoin = 'round';
ctx1.moveTo(20,20);
ctx1.lineTo(100,20);
ctx1.lineTo(100,100);
ctx1.strokeStyle = 'green';
ctx1.stroke();


const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext('2d');
ctx2.beginPath();
ctx2.strokeStyle = 'pink';
ctx2.setLineDash([10,10]);
ctx2.lineDashOffset = 5;
ctx2.moveTo(10,10);
ctx2.lineTo(300,10);
ctx2.stroke();


const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext('2d');
ctx3.beginPath();
ctx3.setLineDash([10,20,5]);
ctx3.moveTo(10,10);
ctx3.lineTo(300,10);
ctx3.strokeStyle = 'red';
ctx3.stroke();

ctx3.fillStyle = 'green';
ctx3.fillRect(50,50,100,100);
ctx3.fill();
ctx3.fillStyle = 'black';
ctx3.clearRect(75,75,50,50);
ctx3.fill();


const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
let offset = 0;
function drawDash(){
	ctx4.clearRect(0,0,300,150);
	ctx4.setLineDash([4,4]);
	ctx4.lineDashOffset = offset;
	ctx4.strokeStyle = 'red';
	ctx4.strokeRect(10,10,100,100);
}
function march(){
	offset--;
	drawDash();
	setTimeout(march,20);
}
march();