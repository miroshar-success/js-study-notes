const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image();
image.onload = drawImage;
image.src = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3779101858,2365354695&fm=26&gp=0.jpg';
function drawImage(){
		ctx.drawImage(this,0,0);
}