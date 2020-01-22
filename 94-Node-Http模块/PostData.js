const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const server = http.createServer((req,res) => {
    let {pathname,query} = url.parse(req.url,true);
    if(pathname === "/login.html"){
        // get请求参数存放在 req.url的 query中
        //        console.log(query);
        /*res.setHeader("content-type","text/html;charset=utf-8");
        res.write("登陆成功");
        res.end();*/
        // Post请求参数存放在缓冲区中,需要一段一段滴读取
        let str = "";
        req.on("data",(chunk) => {
            str += chunk;
        });
        req.on("end",()=>{
            let info = querystring.parse(str);
            // 将用户提交的表单数据保存在一个单独的文件中,可以都提交在一起,也可以把每个用户的数据放在单个文件
            fs.access("./data",(err) => {
                //报错了表明文件不存在,
                if(!err){
                    consoel.log("文件已存在");
                }else{
                    fs.mkdirSync("./data",(err)=>{
                        if(err){
                            console.log(err);
                        }else{
                            console.log("文件创建成功");
                        }
                    })
                }
            });
            fs.writeFile("./data/"+info.name,JSON.stringify(info),(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("数据保存成功");
                }
            });
            res.end("ok");
        })
    }
    fs.readFile("." + pathname,(err,data) => {
        if(err){
            console.log(err);
        }else{
            res.write(data);
            res.end()
        }
    })
 /*   if( pathname === "/ajax封装.html" ){
        fs.readFile("." + pathname,(err,data) => {
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        })
    }*/
});
server.listen(3030);



/*  REVIEW
const fs = require("fs");
const http = require("http");
const url = require("url");
const qs = require("querystring");

fs.access("./data",(err)=>{
    if(err){
        fs.mkdirSync("./data");
    }
});
http.createServer((req,res) => {
    const {pathname,query} = url.parse(req.url,true);
    if(pathname === "/index.html"){
        fs.readFile("./index.html",(err,data) => {
            if(err){
                console.log(err);
            }else{
                res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                res.end(data);
            }
        })
    }else if(pathname === "/login"){
        let str = "";
        req.on("data",(chunk)=>{
            str += chunk;
        });
        req.on("end",()=>{
            const postData = qs.parse(str);
            console.log(postData);
            res.setHeader("Content-Type","text/html;charset=utf-8");
            // 将提交的数据保存下来
            fs.writeFile("./data/"+postData.name,JSON.stringify(postData),(err) => {
                if(err){
                    console.log(err);
                }else{
                    console.log("数据保存成功");
                }
            })
            res.end("提交成功");
        });
    }
}).listen(3000);
console.log("服务监听在3000端口");
*/ 