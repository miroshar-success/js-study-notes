const submit = document.querySelector('.submit');
const file = document.querySelector('.file');

submit.addEventListener('click',upload,false);

let data = new FormData();

file.addEventListener('change',function(e){
	e = e || window.e;
	console.log(e.target.files);
	for(let i = 0, length = e.target.files.length; i < length; i++){
		data.append(e.target.files[i].name,e.target.files[i]);
	}
},false);

function upload(){
	const xhr = new XMLHttpRequest();
	xhr.upload.onloadstart = function(){
		console.log('开始上传');
	}
	xhr.upload.onprogress = function(e){
		console.log(e);
	}
	xhr.open("POST",'http://localhost:3000/upload',true);
	xhr.setRequestHeader('Content-Type','multiple/form-data')
	xhr.send(data);
	xhr.readystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			console.log(xhr.response);
		}
	}
}