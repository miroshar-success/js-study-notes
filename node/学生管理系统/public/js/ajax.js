function ajax(obj){
    let xhr = new XMLHttpRequest();
    if(!obj.async){
        obj.async = true;
    }
    if(obj.method == "GET" && obj.data){
        xhr.url += "?";
        xhr.url += params(obj.data);
        xhr.open(obj.method,obj.url,obj.async);
    }
    if(obj.method == "POST"){
        xhr.open(obj.method,obj.url,obj.async);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params(obj.data));
    }else{
        xhr.send(null);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            obj.success && obj.success( xhr.responseText );
        }
    }
}
function params(obj){
    let [str,temp] = ["",[]];
    for(let key in obj){
        temp.push(key,"=",obj[key],"&");
    }
    str += temp.join("");
    return str.substring(0,str.length-1);
}