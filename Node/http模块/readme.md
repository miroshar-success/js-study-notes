# Http模块

    Node.js提供了Http模块，Http模块主要用于搭建HTTP服务端和客户端
    const http = require("http");

```js
const http = require("http");
http.createServer((req,res)=>{
	res.write()	返回的数据必须是字符串或者Buffer
	res.end();
}).listen(3000);
```
## resquest

	req.url  		请求的地址,包括pathname + 查询字符串
	req.method		请求的方法
	request.setHeader	为请求头对象设置单个请求头的值
		request.setHeader({"Content-Type","application/json"})
	
## response

	response.setHeader(name,value);
		为隐式响应头设置单个响应头的值。 response.setHeader("Content-Type","text/html");
		
	tips:
	1. 如果使用 response.setHeader()设置响应头时,它们将与response.writeHead()的任何响应头合并,其中
	response.writeHead()的响应头优先。
		
# url模块
    
    url模块提供了两套API处理URL:
    1. 旧的版本
        const url = require("url");
        url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
        
    2. 新的版本
        const myUrl = new URL('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
    
    url.parse()
    将地址栏字符串解析成对象 ,第二个参数可以传一个布尔值,如果为true,则解析的地址栏对象的query为一个对象
    
    url.format()
    用于将url对象编程一个url字符串并返回
    
    
# querystring模块

    查询字符串主要由两个方法组成,一个是将对象转换为字符串,一个是将字符串转化为对象
    
    querystring.parse(str,sep,eq,options);
        str: 要解析的URL查询字符串
        sep: 用于查询字符串中分割键值对的字符串,默认值:"&",
        eq: 用于在查询字符串中分割键和值的字符串,默认值:"="
        
```js
// querystring.parse() 将查询字符串 foo=bar&abc=xyz&abc=123解析为
{
    foo:"bar",
    abc:["xyz","123"]
}
```
    tips:
    1. querystring.parse()返回的对象不是继承子JavaScript Object.
    
    
    querystring.stringify(obj,sep,eq,options);
    序列化URL对象
```js
querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
// 返回 'foo=bar&baz=qux&baz=quux&corge='

querystring.stringify({ foo: 'bar', baz: 'qux' }, ';', ':');
// 返回 'foo:bar;baz:qux'
```

# res.setHeader() 和 res.writeHead()区别

    res.setHeader() 只允许设置单个标题
    res.writeHead() 允许设置有关响应头的所有内容,包括状态码,内容和多个标头
    
    example:
        res.setHeader("Content-Type","text/plain");
        res.setHeader("Set-Cookie","type=ninjia");
        res.setHeader("Content-Length",body.length);
        
        res.writeHead(200,{
            "Content-Length": body.length,
            "Content-Type": "text/plain",
            "Set-Cookie": "type=ninja"
        });
		
		res.setHeader("Content-Type","text/css");
		
		
# Form表单提交数据

	enctype: 该属性规定在发送到服务器之前应该如何对表单数据进行编码。默认地,表单数据会编码为 "application/x-www-form-urlencoded"
	
	值:									描述
	application/x-www-form-urlencoded	在发送前编码所有字符
	multipart/form-data					不对字符编码,在使用包含文件上传控件的表单时,必须使用该值.
	text/plain							空格转为"+",但不对特殊字符编码。
	
	method: get/post
	
	get请求的数据 在地址栏后面,可以通过 url.parse(req.url) 获取查询字符串。
	
## GET

```js
http.createServer((req,res)=>{
    const {pathname,query} = url.parse(req.url,true);
    if(pathname === "/index.html"){
        fs.readFile("./index.html",(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.writeHead(200,{"Content-Type":"text/html"});
                res.end(data);
            }
        })
    }else if(pathname === "/login"){
        console.log(query);
        res.end("ok");
    }
}).listen(3000);
```

## POST
	
	POST的数据是存放在buffer中。
	post请求可能传递的数据比较大,需要一段一段的读取。
```js
http.createServer((req,res)=>{
    const {pathname,query} = url.parse(req.url,true);
    if(pathname === "/index.html"){
        fs.readFile("./index.html",(err,data)=>{
            if(err){
                console.log(err);
            }else{
                res.writeHead(200,{"Content-Type":"text/html"});
                res.end(data);
            }
        })
    }else if(pathname === "/login"){
        let str = "";
        req.on("data",(chunk)=>{
            str += chunk;
        });
        req.on("end",() => {
            let postData = qs.parse(str);
            console.log(postData);
            res.end("ok");
        })
    }
}).listen(3000);
```