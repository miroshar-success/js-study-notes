
# cmd

    cmd是系统提供的专门用来操作系统的命令，全称是command
    
    window + R键
    
    cd(change directory) + 文件路径     进行路径跳转
    md  在指定目录创建一个文件
    rd  删除文件
    cd.>文件名字    创建一个文件
    del 文件名字    删除文件
    文件名         直接打开文件名字
    
# npm
	
	node package manager
	
    开发环境        --save-dev
    生产环境        --save
    
    npm -v  版本
    npm install npm -g  升级npm
    
    npm install express     本地安装
    npm install express -g  全局安装
    npm list -g             查看安装信息
    npm uninstall <module name> 写在包
    npm update express      更新包
    
    npm init    初始化一个文件
    
# express
	
	"dependencies"	 	生成环境中需要的	--save
	"devDependencies"	开发环境需要的	--save-dev
	
    安装
    npm install express --save
    
```js
// 引入express框架
const express = require("express");
const app = express();
```

	app.use( express.static("public") );
		将public下的文件设置为静态文件目录并将 index.html文件设置为首页

## express方法
    
    使用指定的回调函数将http get请求路由到指定的路径
    app.get(path,callback)
    
        path: 表示路径的字符串
              路径模式
              用于匹配路径的正则表达式模式
```js
app.get("/",function(req,res){
    res.send("Hello World");
})
```
   使用指定的回调函数将HTTP POST请求路由到指定的路径
   app.post(path,callback)
       
       
   app.use(path,callback)
   get方法和post方法都可以提交
  在指定的路径上安装指定的中间件函数:当请求的路径的基数匹配时,执行中间件函数path
   
   tips:
   路径将立即匹配其路径后面的任何路径"/"。例如app.use("/apple") 将匹配"/apple", "apple/images"
   "apple/images/news"等
   
## request

    request.query
        此属性是一个对象，包含路由中每个查询字符串参数的属性。
    
	request.baseUrl
		挂载路由器实例的URL路径。
		
	request.body
		包含在请求主体中提交的数据的键值对。默认情况下是未定义的,在使用body解析中间件时填充它。
	
	request.cookies
		当使用cookie-parser中间件时，此属性是一个对象，其中包含由请求发送的cookie。如果请求不包含cookie，则默认为{}
	
    request.params
        包含映射到命名路由 "parameters"的属性，如果有路线/user/:name,则"name"属性可用作
        req.params.name.
    
    request.protocol
        包含请求协议字符串:http或者https
    
    request.method
        包含对应于请求的HTTP方法的字符串
        
    request.route
        包含匹配的当前路由,一个字符串。
		
 ## res

    响应对象(res)的方法可以像客户端发送响应,并终止请求/响应循环。
	res.download()  提示要下载文件
	res.end()       结束响应进程
	res.json()      发送JSON响应
	res.jsonp()     在JSONP的支持下发送JSONP
	res.redirect()  重定向请求
	
	res.render()    
		呈现视图模板。	先设置视图模板 app.set("view engine","ejs");
	
	res.send()      
		发送HTTP响应。主体参数可以是缓冲区对象、字符串、对象或数组。
		
	res.sendFile()  以八位元流形式发送文件
	
	res.sendStatus() 设置响应状态码并以响应主图形式发送其字符串表示
	
## app方法

	app.use()	
	在指定路径上挂载指定的或多个中间件函数:当请求的路径的基础与路径匹配时，将执行中间件函数。
	
	app.get()
	使用指定的回调函数将HTTP GET请求路由到指定的路径。
	
	app.post()
	使用指定的回调函数将HTTP POST请求路由到指定的路径。
	
	app.listen()
	设置监听端口
		
## 获取GET/POST请求的数据

    get请求的数据 包含的 req.query中
    post请求的数据 需要借助中间件 formidable
    
        $ npm install formidable --save

```js
const formidable = require("formidable");

app.post("/login",(req,res)=>{
    let form = new formidable.IncomingForm();
    form.parse(req,(err,fields,files)=>{
        if(!err){
            console.log(fields);
        }
    })
})
```
    tips:
    1. fields 字符类的post数据
    2. files  是文件类的post数据
    
    API:
    1. var form = new formidable.IncomingForm();
    2. form.encoding = "utf-8";
    3. form.uploadDir = "/mydir"
    
    
# Form的enctype属性
     
     enctype属性规定在发送到服务器之前应该如何对表单数据进行编码。
     
     默认地，表单数据会编码为 "application/x-www-form-urlencoded"。就是在发送到服务器之前,所有字符都会
     进行编码。
     
    下面的例子，表单数据会在未编码的情况下进行发送。
```html
<form action="form_action.asp" enctype="text/plain">
      <p>First name: <input type="text" name="fname" /></p>
      <p>Last name: <input type="text" name="lname" /></p>
      <input type="submit" value="Submit" />
</form>
```
    application/x-www-form-urlencoded       在发送前编码所有字符
    multipart/form-data                     不对字符编码，在使用包含文件上传空间的表单时,必须使用该值。
    text/plain                              空格转换为"+",但不对特殊字符编码
    
# 第三方模块
	
	body-parser
	cookie-parser

## body-parser

    body-parser也可以获取post方式传递的数据,但是只能获取字符，不能获取文件
    
    npm install body-parser
    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({
        extended:false
    }));
    

## Express中间件

	1. 中间件就是处理HTTP请求的函数。一个中间件处理完,再传递给下一个中间件。
	2. 中间件有三个参数分别是 request对象, response对象 next回调函数(代表下一个中间件)。

	
	app.use(path,router)
	app.use的作用是将一个中间件绑定到应用中,参数path是一个路径前缀,用于限定中间件的作用范围,所有以该前缀开始的
	请求的路径均是中间件的作用范围。
		router代表一个express.Router()创建的对象，
	
	use 和 method都可以调用中间件,两者的区别当一个路径有多个匹配规则时,使用app.use(),否则使用app.method(get,post)	
	
	next中可以填写参数,如果填写的参数是route,可以直接跳转到下一个路由。
	
```js
// demo1  可以为单个HTTP请求执行多个路由处理程序。

const express = require("express");
const app = express();

app.get("/",(req,res,next)=>{
	res.write("Hello");
	next();
})

app.get("/",(req,res,next)=>{
	res.write("World");
	res.end();
})

app.listen(3000);
```
	next() 方法用于调用与路径匹配的下一个路由处理程序。
```js
demo2 也可以将多个路由处理程序传递给app.app() app.get() app.post()等方法

app.get("/",(req,res,next)=>{
	res.write("Hello");
	next();
},(req,res,next)=>{
	res.write("World");
	res.end();
})

```
	