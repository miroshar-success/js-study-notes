const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function draw(){
	for(let i = 0; i < 6; i++){
		for(let j = 0; j < 6; j++){
			ctx.fillStyle = 'rgb('+Math.floor(255-42.5*j)+','+Math.floor(255-42.5*i)+',0)';
			ctx.fillRect(j*25,i*25,25,25);
			ctx.fill();
		}
	}
}
draw();

const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');
function circle(){
	for(let i = 0; i < 6; i++){
		for(let j = 0; j < 6; j++){
			ctx1.strokeStyle = 'rgb('+Math.floor(255-30*i)+','+Math.floor(255-30*j)+ ',0)';
			ctx1.beginPath();
			ctx1.arc(12.5+j*25,12.5+i*25,12.5,0,Math.PI*2,false);
			ctx1.stroke();
		}
	}
}
circle();


const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');
ctx2.fillStyle = '#fd0';
ctx2.fillRect(0,0,75,75);
ctx2.fillStyle = 'pink';
ctx2.fillRect(75,0,75,75);
ctx2.fillStyle = 'skyblue';
ctx2.fillRect(0,75,75,75);
ctx2.fillStyle = '#F30';
ctx2.fillRect(75,75,75,75);

ctx2.fillStyle = '#fff';
ctx2.globalAlpha = 0.2;
for(let i = 0; i < 7; i++){
	ctx2.beginPath();
	ctx2.arc(75,75,10+10*i,0,Math.PI*2,true);
	ctx2.fill();
}


const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
ctx3.fillStyle = 'rgb(255,221,0)';
ctx3.fillRect(0,0,150,37.5);
ctx3.fillStyle = 'rgb(102,204,0)';
ctx3.fillRect(0,37.5,150,37.5);
ctx3.fillStyle = 'rgb(0,153,255)';
ctx3.fillRect(0,75,150,37.5);
ctx3.fillStyle = 'rgb(255,51,0)';
ctx3.fillRect(0,112.5,150,37.5);
for(let i = 0; i < 10; i++){
	ctx3.fillStyle = 'rgba(255,255,255,'+ (i+1)/10 + ')';
	for(let j = 0; j < 4; j++){
		ctx3.fillRect(5+i*14,5+j*37.5,14,27.5);
	}
}