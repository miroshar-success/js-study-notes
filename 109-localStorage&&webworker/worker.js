self.onmessage = function(event){
    console.log(event.data);
    let str = "";
    for(let i = 0; i < event.data; i++){
        str += String.fromCharCode(i);
    }
    self.postMessage(str);
}