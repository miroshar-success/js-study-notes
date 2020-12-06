const username = document.querySelector('.username');
const age = document.querySelector('.age');
const submit = document.querySelector('.submit');
submit.addEventListener('click',function(event){
	if(!username.value || !age.value){
		window.alert('用户名或密码不能为空');
		return;
	}
	let data = {
		username:username.value,
		age:age.value
	}
	let data_1 = `username=${username.value}&age=${age.value}`;
	const xhr = new XMLHttpRequest();
	xhr.open('POST','http://localhost:3000/file',true,'jayk','123456');
	xhr.responseType = 'json';
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.send(data_1);
	xhr.onload = function(){
		console.log(xhr.response);
		console.log(xhr.getResponseHeader('Content-Type'))
	}
},false);