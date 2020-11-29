const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.fillStyle = 'red';
ctx.arc(75,75,50,0,2*Math.PI,false);
ctx.fill();

ctx.globalCompositionOperation = 'source-over';
ctx.globalCompositeOperation = 'source-in';
ctx.globalCompositeOperation = 'source-out';
ctx.globalCompositeOperation = 'source-atop';
ctx.globalCompositeOperation = 'destination-over';
ctx.globalCompositeOperation = 'destination-in';
ctx.globalCompositeOperation = 'destination-out';
ctx.globalCompositeOperation = 'destination-atop';
ctx.globalCompositeOperation = 'lighter';
ctx.globalCompositeOperation = 'copy';
ctx.globalCompositeOperation = 'xor';
ctx.globalCompositeOperation = 'multiply';
ctx.globalCompositeOperation = 'screen';
ctx.globalCompositeOperation = 'overlay';
ctx.globalCompositeOperation = 'darken';
ctx.globalCompositeOperation = 'destination-atop';
ctx.beginPath();
ctx.fillStyle = 'yellow';
ctx.arc(125,75,50,0,2 * Math.PI,false);
ctx.fill();

console.log(canvas.toDataURL() );

canvas.toBlob(blob => {
	console.log('blob:',blob);
	let url = window.URL.createObjectURL(blob);
	let a = document.createElement('a');
	a.href = url;
	a.download = Date.now();
	a.click()
})