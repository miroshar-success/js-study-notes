/*http.createServer((req,res)=>{
    res.writeHead(200,{
        //设置跨域
        "Access-Control-Allow-Origin":"*",
        "Content-Type":"text/plain"
    })
    res.end("Hello World!");
}).listen(4000);  */
/*
let data = {
    name:"kyrie",
    age:26
}

http.createServer((req,res) => {
    console.log(req.url);
    let params = url.parse(req.url,true);
    let fun = params.query.callback;
    res.writeHead(200,{
        "Access-Control-Allow-Origin":"*",
        "Content-Type":"text/html"
    })
    let str = fun+"(" +JSON.stringify(data)+")";
    res.end(str);
}).listen(7000);  */
const express = require("express");
const app = express();
const formidable = require("formidable");

app.post("/",function(req,res){
    res.header({
        "Access-Control-Allow-Origin":"*"
    });
    let form = new formidable.IncomingForm();
    form.uploadDir = "./upload";
    form.multiples = true;
    form.keepExtensions = true;
    form.parse(req,(err,fields,files) => {
        if(!err){
            console.log(files);
            res.send("上传成功");
        }
    })
}).listen(63342);
console.log("程序已启动");



