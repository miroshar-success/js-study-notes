const xhr = new XMLHttpRequest();
xhr.open('GET','http://localhost:3000/check',true);
xhr.responseType = 'json';
xhr.withCredentials = true;
xhr.send(null);

xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 && xhr.status == 200){
		console.log(xhr.response);
	}
}