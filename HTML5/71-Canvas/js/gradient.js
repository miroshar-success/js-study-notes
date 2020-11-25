const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const linearGradient = ctx.createLinearGradient(0,0,300,150);
linearGradient.addColorStop(0,'white');
linearGradient.addColorStop(1,'green');

ctx.fillStyle = linearGradient;
ctx.fillRect(0,0,300,150);


const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
const radialGradient = ctx1.createRadialGradient(75,75,5,75,75,75);
radialGradient.addColorStop(0.5,'green');
radialGradient.addColorStop(1,'red');
ctx1.fillStyle = radialGradient;
ctx1.fillRect(0,0,150,150);


const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
const linear1 = ctx2.createLinearGradient(0,0,300,0);
linear1.addColorStop(0,'#00ABEB');
linear1.addColorStop(0.5,'#ffffff');
linear1.addColorStop(0.5,'#26c000');
linear1.addColorStop(1,'#ffffff');
ctx2.fillStyle = linear1;
ctx2.fillRect(0,0,300,150);

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
const linear2 = ctx3.createLinearGradient(0,0,300,0);
linear2.addColorStop(0,'green');
linear2.addColorStop(1,'red');
ctx3.beginPath();
ctx3.strokeStyle = linear2;
ctx3.lineWidth = 10;
ctx3.moveTo(20,20);
ctx3.lineTo(300,20);
ctx3.stroke();

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas4.getContext('2d');
const r1 = ctx4.createRadialGradient(45,45,10,52,50,30);
r1.addColorStop(0,'#a7d30c');
r1.addColorStop(0.9,'#019f62');
r1.addColorStop(1,'rgba(1,559,98,0)');

const r2 = ctx4.createRadialGradient(105,105,20,112,120,50);
r2.addColorStop(0,'#ff5f98');
r2.addColorStop(0.75,'#ff0188');
r2.addColorStop(1,'rgba(255,1,136,0)');

const r3 = ctx4.createRadialGradient(95,15,15,102,20,40);
r3.addColorStop(0,'#00c9ff');
r3.addColorStop(0.8,'#00b5e2');
r3.addColorStop(1,'rgba(0,201,255,0)');

var r4 = ctx4.createRadialGradient(0,150,50,0,140,90);
r4.addColorStop(0, '#F4F201');
r4.addColorStop(0.8, '#E4C700');
r4.addColorStop(1, 'rgba(228,199,0,0)');

ctx4.fillStyle = r4;
ctx4.fillRect(0,0,150,150);
ctx4.fillStyle = r3;
ctx4.fillRect(0,0,150,150);
ctx4.fillStyle = r2;
ctx4.fillRect(0,0,150,150);
ctx4.fillStyle = r1;
ctx4.fillRect(0,0,150,150);
