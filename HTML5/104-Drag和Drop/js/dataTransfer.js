const oContainer = document.querySelector('#container');
oContainer.addEventListener('dragover',drag,false);
oContainer.addEventListener('drop',drag,false);
// 在网页里的图片 无法获取到Base64编码格式的图片,下面的方法是拖放网页外部的文件预览
let oSpan = document.getElementsByTagName('span')[0];
// oSpan.ondragstart = function(e){
//     e = e || window.event;
//     e.dataTransfer.setData("Text",this.innerText);
// }
function drag(e){
	e = e || window.e;
	e.preventDefault();
	e.stopPropagation();
	const type = e.type;
	switch(type){
		case "dragover":
			console.log('进入目标区域');
			break;
		case "drop":
			/* 读取图片
			let file = e.dataTransfer.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e){
					console.log(e.target);
					oContainer.innerHTML += `<img src=${e.target.result} width="200"/>`
			}
			// 通过 Blob读取图片
			let file = e.dataTransfer.files[0];
			let blob = new Blob([file],{type:'image/png'})
			const img = new Image(200,200);
			const url = window.URL.createObjectURL(blob);
			img.src = url;
			img.onload = function(){
					window.URL.revokeObjectURL(blob);
			}
			oContainer.appendChild(img);
			*/

			/*
			// 读取文本文件
			let file = e.dataTransfer.files[0];
			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = function(e){
					console.log(e.target.result);
					oContainer.textContent = e.target.result;
			}
			 */
			break;
	}
}

// 拖动网页里的图片并预览图片
function drag(e){
	e = e || window.event;
	e.preventDefault();
	e.stopPropagation();
	const type = e.type;
	switch(type){
		case "dragover":
			console.log('dragover');
			break;
		case "drop":
			let dataTransfer = e.dataTransfer;
			console.log(dataTransfer);
			let text = dataTransfer.getData('text/plain');
			console.log(text);
			/*
			let url = dataTransfer.getData('url') || dataTransfer.getData('uri-list');
			console.log(url);
			oContainer.innerHTML += `<img src=${url} width='200'/>`
			 */
			break;
	}
}