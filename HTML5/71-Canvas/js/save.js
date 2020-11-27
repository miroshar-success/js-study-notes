const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;
ctx.moveTo(5,5);
ctx.lineTo(100,5);
ctx.stroke();

ctx.save();
ctx.beginPath();
ctx.strokeStyle = 'green';
ctx.lineWidth = 10;
ctx.moveTo(5,30);
ctx.lineTo(100,30);
ctx.stroke();

ctx.restore();
ctx.beginPath();
ctx.moveTo(5,50);
ctx.lineTo(100,50);
ctx.stroke();



const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
ctx1.beginPath();
ctx1.lineWidth = 5;
ctx1.strokeStyle = 'red';
ctx1.moveTo(5,5);
ctx1.lineTo(100,5);
ctx1.stroke();

ctx1.beginPath();
ctx1.strokeStyle = 'green';
ctx1.lineWidth = 10;
ctx1.moveTo(5,30);
ctx1.lineTo(100,30);
ctx1.stroke();

ctx1.beginPath();
ctx1.moveTo(5,50);
ctx1.lineTo(100,50);
ctx1.stroke();


const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

ctx2.beginPath();
ctx2.fillStyle = 'red';
ctx2.moveTo(5,5);
ctx2.lineTo(5,105);
ctx2.lineTo(20,55);
ctx2.fill();


const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
ctx3.beginPath();
ctx3.strokeStyle = 'red';
ctx3.moveTo(50,50);
ctx3.lineTo(100,50);
ctx3.fillStyle = 'red';
ctx3.arc(50,50,50,0,90*Math.PI/180,false);
// ctx3.stroke();
ctx3.fill();


const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
ctx4.fillStyle = 'red';
ctx4.fillRect(0,0,150,150);
ctx4.save();
ctx4.fillStyle = 'green';
ctx4.fillRect(15,15,120,120);
ctx4.save();
ctx4.fillStyle = 'pink';
ctx4.fillRect(30,30,90,90);
ctx4.restore();
ctx4.fillRect(45,45,60,60);
ctx4.restore();
ctx4.fillRect(60,60,30,30);