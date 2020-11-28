const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const image_data = ctx.createImageData(300,150);
// 每四个值分别表示 r g b a
for(let i = 0, length = image_data.data.length; i < length; i+=4){
	image_data.data[i] = Math.floor(Math.random() * 256);
	image_data.data[i+1] = Math.floor(Math.random() * 256);
	image_data.data[i+2] = Math.floor(Math.random() * 256);
	image_data.data[i+3] = 200;
}
ctx.putImageData(image_data,0,0);



