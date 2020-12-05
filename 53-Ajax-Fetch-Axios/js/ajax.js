function get_player_list(){
	const xhr = new XMLHttpRequest();
	console.log('UNSENT',xhr.readyState);
	// xhr.timeout = 1000;
	xhr.responseType = 'json';
	xhr.open('GET','http://localhost:3000/player',true);
	console.log('OPEND',xhr.readyState);
	xhr.onprogress = function(event){
		console.log('loading',xhr.readyState);
		console.log('progress-event',event);
	}
	xhr.onload = function(){
		console.log('done',xhr.readyState)
	}
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			console.log('查询所有信息:',xhr.response);
			console.log('request_url:',xhr.responseURL);
			console.log('status:',xhr.status);
		}
	}
}
get_player_list();

function get_player_info(){
	const xhr = new XMLHttpRequest();
	xhr.open("GET",'http://localhost:3000/player?first_name=kyrie',true);
	xhr.responseType = 'text';
	xhr.send(null);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			console.log('查询到到信息:',xhr.response);
			console.log('json字符串:',xhr.responseText,typeof xhr.responseText);
			console.log('对象:',JSON.parse(xhr.responseText));
			console.log('请求的url:',xhr.responseURL);
			console.log('statusText:',xhr.statusText);
		}
	}
}
// get_player_info();