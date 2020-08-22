# Koa-router
    
    路由是由一个URL和一个特定的HTTP方法组成的。
	
	可以借助中间件 koa-router
	
	npm install koa-router --save
	
	
	将路由都添加一个层级:
```js	
const router = new Router({
	prefix:'/api'
})
```
	
# Example

	获取get请求时的参数
```js
const Koa = require('koa');
const Router = require('koa-router');

const server = new Koa();
const router = new Router();

router.get('/user',async ctx => {
	// 获取get请求的参数 
	console.log(ctx.query,ctx.querystring);
	/*
	ctx.query  { name: 'kyrie', age: '27' }
	ctx.querystring  'name=kyrie&age=27
	*/
	ctx.body = 'hello world';
});

server.use(router.routes()).use(router.allowedMethods());

server.listen(3000,function(){
	console.log('starting at the port 3000');
})
```

# Cookies

	Cookie主要通过报头HTTP Header来传递数据,Cookie定义了两种报头: Set-Cookie 和 Cookie包头。Set-Cookie存在于服务器的消息中。
	而Cookie存在于客户端请求的消息头中。

	创建Cookie:
	当服务器接收到HTTP请求时,服务器可以在响应头里面添加一个Set-Cookie选项。浏览器收到响应后通常会保存下Cookie。之后对该服务器的每一次
	请求中都会通过Cookie请求头部将Cookie信息发送给服务器。
	
	Set-Cookie响应头部和Cookie请求头部：
		response.setHeader('Set-Cookie',['type=ninja','language=javascript']);
		
	
	tips:
	1. cookie会被附加在每个HTTP请求中,所以无形中增加了流量。
	2. Cookie的大小限制在4KB左右。

	ctx.cookies.set(name,value,[options])
		
	options:
		maxAge: 	一个数字表示从Date.now()得到的毫秒数
		signed: 	cookie签名值
		expires: 	cookie过期的Date
		path:		cookie的路径,默认是'/'
		domain:		cookie域名
		httpOnly:	服务器可访问cookie,默认是true
		overwrite:	一个布尔值,表示是否覆盖以前设置的同名的cookie(默认是false)。
		
	ctx.cookies.get(name,[options])
		获取cookie name
		
# Cookies Demo


	这里使用的是cookies 模块
```js
const http = require('http');
const Cookies = require('cookies');

var keys = ['keyboard cat']

const server = http.createServer(function(req,res){
	var cookies = new Cookies(req,res,{keys:keys});
	
	var lastVisit = cookies.get('lastVisit',{signed:true})
	
	cookies.set('lastVisit',new Date().toISOString(),{signed:true});
	
	if(!lastVisit){
		res.setHeader('Content-Type','text/plain');
		res.end('Welcome,first time visitor!');
	}else{
		res.setHeader('Content-Type','text/plain');
		res.end('Welcome back! Nothing much changed since your last visit at ' + lastVisit + '.');
	}
})

server.listen(3030,() => {
	console.log('ajax-koa-server start at port 3030');
})
```