// 通过标签download属性 可以下载本地.jpg png格式文件,但是第三方路径文件会默认跳转读取文件
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const link = document.querySelector('.link');
const image = new Image();
image.src = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3403073521,3211226630&fm=26&gp=0.jpg'
image.setAttribute('crossOrigin', 'anonymous')
console.log('width:',image.width);
console.log('height:',image.height);
canvas.width = image.width; canvas.height = image.height;
canvas.style.display = 'none';
link.onclick = function(){
	ctx.drawImage(image,0,0,canvas.width,canvas.height);
	canvas.toBlob(blob => {
		console.log(blob)
		let url = window.URL.createObjectURL(blob);
		let a = document.createElement('a');
		a.download = Date.now();
		a.href = url;
		a.click();
	})
}