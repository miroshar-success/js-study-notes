const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.beginPath();
ctx.moveTo(20,20);           // 创建开始点
ctx.lineTo(100,20);          // 创建水平线
ctx.arcTo(150,20,150,70,50); // 创建弧
ctx.lineTo(150,120);         // 创建垂直线
ctx.stroke();                // 进行绘制

ctx.beginPath();
ctx.strokeStyle = 'green';
ctx.moveTo(30,30);
ctx.lineTo(100,30);
ctx.arcTo(150,30,30,150,20);
ctx.lineTo(30,150);
ctx.stroke();



const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
ctx1.beginPath();
ctx1.strokeStyle = 'red';
ctx1.moveTo(10,75);
ctx1.quadraticCurveTo(50,10,300,75);
ctx1.stroke()