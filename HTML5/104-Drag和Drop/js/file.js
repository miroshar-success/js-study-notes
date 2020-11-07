let oContainer = document.querySelector('.container');
oContainer.ondragover = function(e){
	e = e || window.event;
	e.preventDefault();
	e.stopPropagation();
}
oContainer.ondrop = function(e){
	e = e || window.event;
	e.preventDefault();
	console.log('files[0]',e.dataTransfer.files[0]);
	console.log('name:',e.dataTransfer.files[0].name);
	console.log('size:',Math.round(e.dataTransfer.files[0].size/1024) + 'KB');
	console.log('type:',e.dataTransfer.files[0].type);
	console.log('lastModifiedDate:',e.dataTransfer.files[0].lastModifiedDate);
	console.log('toLocalString:',e.dataTransfer.files[0].lastModifiedDate.toLocaleString());
	console.log('toLocaleDateString:',e.dataTransfer.files[0].lastModifiedDate.toLocaleDateString());
	console.log('toLocaleTimeString:',e.dataTransfer.files[0].lastModifiedDate.toLocaleTimeString());

	let files = e.dataTransfer.files;
	for(let i = 0,file; file = files[i]; i++){
		let reader = new FileReader();
		reader.readAsDataURL(file);
		// 在文件读取结束之后可以获取读取结果
		reader.onload = function(event){
			let img = new Image(100,100);
			img.src = event.target.result;
			img.onload = function(){
				oContainer.appendChild(img);
			}
		}
	}
}