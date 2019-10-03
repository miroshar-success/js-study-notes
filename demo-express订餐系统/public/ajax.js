/*
* options参数
* url 请求的地址
* method : get || post ，默认get
* data 请求的数据
* async 同步还是异步 默认 true 异步
* success 请求成功的回调函数
* */

function ajax(options={}){
    const xhr = new XMLHttpRequest();
    if(!options.async){
        options.async = true;
    }
    options.method = (options.method || "GET").toUpperCase();
    let data = [];
    for(let key in options.data){
        data.push(key+"="+options.data[key]);
    }
    data = data.join("&");
    if(options.method === "GET"){
        xhr.open("GET",options.url+"?"+data,true);
        xhr.send(null);
    }else if(options.method === "POST"){
        xhr.open("POST",options.url,true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(options.data);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            const status = xhr.status;
            if(status >=200 && status < 300){
                options.success && options.success(xhr.responseText);
            }else{
                options.error && options.error(status);
            }
        }
    }

}
