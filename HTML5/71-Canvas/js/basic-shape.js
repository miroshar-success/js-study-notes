const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 填充一个填充矩形	
ctx.fillStyle = '#f00';
ctx.fillRect(0,0,50,50);

// 绘制一个无填充的矩形
ctx.strokeStyle = '#f00';
ctx.strokeRect(60,2,50,50);

// 使用rect创建填充矩形
ctx.rect(0,60,50,50);
ctx.fillStyle = '#f0f'
ctx.fill();

// 使用rect绘制描边矩形
ctx.rect(60,60,50,50);
ctx.strokeStyle = '#00f';
ctx.stroke();

// 绘制一个圆形
ctx.beginPath()
ctx.arc(100,100,50,0,2 * Math.PI,true);
ctx.fillStyle = 'yellow';
ctx.fill();

const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext('2d');
ctx1.beginPath();
ctx1.arc(50,50,50,0,Math.PI,false);
ctx1.fillStyle = 'red';
ctx1.fill();
ctx1.closePath();

ctx1.beginPath();
ctx1.arc(50,50,50,0,Math.PI,true);
ctx1.fillStyle = 'pink';
ctx1.fill();


// 绘制线段
ctx1.beginPath();
ctx1.moveTo(100,50);	//定义一个起点
ctx1.lineTo(150,50);
ctx1.lineTo(125,0);
ctx1.closePath();
ctx1.strokeStyle = 'green';
ctx1.lineWidth = 6;
ctx1.stroke();
ctx1.fillStyle = 'yellow';
ctx1.fill();

// 闭合路径时 使用closePath() 和 使用 lineTo 绘制到起点
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext('2d');
ctx2.beginPath()
ctx2.moveTo(100,50);
ctx2.lineTo(150,50);
ctx2.lineTo(125,0);
ctx2.lineTo(100,50);
ctx2.lineWidth = 10;
ctx2.strokeStyle = 'yellow';
ctx2.stroke();
ctx2.closePath();


ctx2.beginPath();
ctx2.moveTo(200,50);
ctx2.lineTo(250,50);
ctx2.lineTo(225,0);
ctx2.closePath();
ctx2.strokeStyle = 'yellow';
ctx2.lineWidth = 10;
ctx2.stroke();


