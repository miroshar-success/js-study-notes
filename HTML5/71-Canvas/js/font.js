const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.font = '30px Arial';
ctx.textAlign = 'center';
ctx.fillStyle = 'pink';
ctx.shadowColor = 'red';
ctx.shadowOffsetX = 6;
ctx.shadowOffsetY = 5;
ctx.shadowBlur = 3;
ctx.direction = 'rtl';
ctx.fillText('Hello World!',150,75);

ctx.font = '30px Arial';
ctx.textAlign = 'center';
ctx.strokeStyle = 'green';
ctx.strokeText("Hello World",10,50);


const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext('2d');
ctx1.beginPath();
// ctx1.lineJoin = 'miter';
// ctx1.lineJoin = 'round';
ctx1.moveTo(20,20);
ctx1.lineTo(100,20);
ctx1.lineWidth = 10;
ctx1.lineCap = 'round';
ctx1.lineCap = 'square';
ctx1.lineCap = 'butt';
ctx1.strokeStyle = 'red';
ctx1.lineTo(100,100);

ctx1.stroke();
ctx1.closePath();



const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
ctx2.font = '48px serif';
ctx2.fillStyle = 'red';
ctx2.fillText('Hello World',10,50);

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
ctx3.strokeStyle = 'red';
ctx3.font = '48px serif'
ctx3.textAlign = 'center';
ctx3.textBaseline = 'middle';
ctx3.strokeText('你好,世界',150,75);


const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
const text = ctx4.measureText('foo');
console.log(text.width);
