/* const http = require("http");
const url = require("url");

let ajax-koa-server = http.createServer((req,res) => {
    console.log(req.url);
    res.setHeader("content-type","text/html;charset=utf-8");
    res.write("<h1>Hello World</h1>");
    res.end();
});
ajax-koa-server.listen(3000);

let str = "https:80//www.baidu.com/a/b/c?name=kyrie#age=26";
console.log( url.parse(str,true) );

const urlObj = {
    protocol:"https",
    port:80,
    hostname:"www.baidu.com",
    hash:"#title=page1",
    query:"age=26&sex=male",
    search:"?age=26&sex=male",
    pathname:"/banners/imgs"
}
const result = url.format(urlObj);
console.log(result);

const querystring = require("querystring");

let a = querystring.stringify({foo:"bar",baz:"fun"});
console.log(a);

let strObj = "name=kyrie&age=26&team=client";
let b = querystring.parse(strObj);
console.log(b);

console.log(querystring.stringify( {foo:"bar",abc:["xyz",123]}, "*","#")); */

const http = require("http");
const url = require("url");
const fs = require("fs");
/*
http.createServer((req,res) => {
    let {pathname,query} = url.parse(req.url);
    console.log(pathname,query);
    if(pathname === "/index.html"){
        fs.readFile("."+pathname,(err,data) => {
            if(err){
                res.end("404 Not Found")
            }else{
                res.end(data);
            }
        })
    }else if(pathname === "/imgs/gcj.jpg"){
        fs.readFile("." + pathname,(err,data) => {
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        })
    }else if(pathname === "/main.js"){
        fs.readFile("." + pathname,(err,data) => {
            if(err){
                console.log(err);
            }else{
                res.write(data);
                res.end();
            }
        })
    }
    else{
        res.end("<h1>404 Not Found<h1>");
    }
}).listen(3000); */

let str = 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash';
const myUrl = new URL(str);
let {protocol,origin,hostname,port,query,pathname} = myUrl;
console.log(protocol,origin,hostname,port,query,pathname);

const path = require("path");
