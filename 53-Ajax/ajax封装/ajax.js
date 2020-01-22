/* 
1. 请求的地址 url
2. 请求的方式method  get post
3. 请求同步还是异步 async
4. 请求的数据 data
5. 请求成功执行的函数 success

*/ 

function ajax(obj){
    var xhr = new XMLHttpRequest();
    if( obj.method == 'GET' && obj.data){
        // 将请求的数据拼接到 url 后面,需要封装一个函数 拆分data的数据
        obj.url += params(obj.data);
    }
    // 默认是true,异步请求
    if(!obj.async){
        obj.async = true;
    }
    // 准备
    xhr.open(obj.method,obj.url,obj.async);
    // 如果请求是POST,设置请求头
    if(obj.method == 'POST'){
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xhr.send(params(obj.data));
    }else{
        xhr.send();
    }
    // 接收数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            // 将获取到的数据作为参数 传入 success函数
            obj.success && obj.success( xhr.responseText)
        }
    }
}

// url?name=jay&age=40;
function params(obj){
    let str = '?';
    for(let key in obj){
        str += key;
        str += '=';
        str += obj[key];
        str += '&';
    }
    return str.slice(0,str.length-1);
}

