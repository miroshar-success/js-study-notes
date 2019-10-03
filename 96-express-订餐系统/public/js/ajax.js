/*
* method 请求的方法
* data 请求的数据
* url   请求的地址
* async 同步还是异步请求
* success 请求成功时的回调函数
* */
function ajax(obj){
    let xhr = new XMLHttpRequest();
    // 判断是GET还是POST请求 如果是get请求并且有数据的时候
    if(obj.method === "GET" && obj.data){
        obj.url += params(obj.data);
    }
    if(!obj.async){
        obj.async = true;
    }
    xhr.open(obj.method,obj.url,obj.async);
    if(obj.method === "POST"){
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.open(obj.method,obj.url,obj.async);
        xhr.send(params(obj.data));
    }else{
        xhr.send(null);
    };
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            obj.success && obj.success( xhr.responseText );
        }
    }
}
// 将传递的数据对象 序列化
function params(obj){
    let [str,temp] = ["?",[]];
    for(let key in obj){
        temp.push(key,"=",obj[key],"&");
    }
    str += temp.join("");
    return str.substring(0,str.length-1);
}

