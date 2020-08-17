const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");

let server = http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url == "/"){
        let target = path.join(__dirname,"./index.html");
        fs.readFile(target,(err,data)=>{
            if(!err){
                res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
                console.log(data);
                res.write(data);
                res.end();
            }
        })
    }else if(req.url == "/login"){
        console.log(url.route);
        let form = new formidable.IncomingForm();
        form.parse(req,(err,fields,files)=>{
            if(!err){
                res.setHeader("Content-Type","text/plain");
                console.log(fields);
                res.end("表单提交成功");
            }
        })
    }
});
server.listen(3000);