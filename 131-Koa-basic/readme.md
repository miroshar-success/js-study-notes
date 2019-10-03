# Koa

	app.callback()
	
	返回使用于 http.createServer()方法的回调函数来处理请求。
```js
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();

http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
```

	app.use(function)
	将给定中间件方法添加到应用程序。
	
# 上下文(Context)

	Koa Context将node的request和response对象封装到单个对象中。为编写Web应用程序和API提供了许多有用的方法。
	
	每个请求都将创建一个Context,并在中间件中作为接收器引用,为方便起见许多上下文的访问器或方法直接委托给它们的
	ctx.request或ctx.response, 例如 ctx.type 和 ctx.length 委托给response对象。
	ctx.path 和 ctx.method委托给request。
	
	
	ctx.req
		Node的 request对象
	
	ctx.res
		Node的 response对象
		
	ctx.request
		Koa的 Request对象
		
	ctx.response
		Koa的 Response对象
		
		
	ctx.state
		推荐的命名空间,用于通过中间件传递信息和你的前端视图。用于保存中间件的数据状态
		ctx.state配置的全局变量不仅可以在其他的路由页面使用,还可以在全局模板使用。
		
## Request别名

	ctx.header / ctx.headers	获取所有的请求头信息 ctx.header === ctx.headers 等同于 ctx.request.header。  
	ctx.header= 				设置请求头对象
	ctx.method					请求的方法
	ctx.method=					设置请求类型(并不会修改当前HTTP请求的真实类型),对有些中间件的场景下可能有用。
	ctx.query					get请求参数格式好的字符串 {name:'jayk',age:18}
	ctx.querystring				get请求参数字符串 name=jayk&age=18
	ctx.origin					获取请求源url,包括主机,协议和端口 origin: http://127.0.0.1:3000
	ctx.href					获取请求完整的URL: href: http://127.0.0.1:3000/?name=kyrie&age=27
	ctx.path					获取请求的路径名 /  
	
## Response别名

	response.header				响应标头对象
	response.headers			响应标头对象
	response.status				获取响应状态。默认情况下,response.status设置为404而不是像Node的res.statusCode那样默认为200
	response.status				响应的状态消息。
	response.body				响应的主体
	response.body=				将响应体设置为以下之一: string / Buffer / Stream / Object || Array 
	response.get()				不区分大小写获取响应标头字段值 field
	response.set(field,value)	设置响应标头field 到 value
	response.set(fields)		用一个对象设置多个响应标头fields


# 获取post请求的数据

	
```js
// 一个小Koa demo
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
	if(ctx.path == '/' && ctx.method == 'GET' ){
		let html = `
			<form method='POST' action='login'>
				<p>用户名:<input name='username'></p>
				<p>年龄:<input name='age'></p>
				<input type='submit' value='提交'>
			</form>
		`
		ctx.body = html;
	}
	if(ctx.path == '/login' && ctx.method == 'POST'){
		function getPostData(){
			return new Promise((resolve,reject)=>{
				try{
					let postData = "";
					ctx.req.on('data',(data)=>{
						postData += data;
					})
					ctx.req.on('end',function(){
						let data = parseData(postData);
						resolve(data);
					})
				}catch(e){
					reject(e);
				}
			})
		}
		let postData = await getPostData();
		ctx.body = `已接受到Post参数:${postData}`
	}
})

// 解析获取到的字符串参数,将其返回一个对象格式 
function parseData(str){
	let temp = str.split('&');
	let obj = {}
	for(let item of temp.values()){
		let arr = item.split('=');
		let key = arr[0];
		let value = decodeURIComponent(arr[1]);
		obj[key] = value;
	}
	return obj
}
```


	原生Node 获取 post 请求数据的方法
```js
const http = require('http');
const querystring = require('querystring');	
/*
querystring.parse() 将字符串反序列化为对象 
querystring.stringify()	将对象序列化为字符串
*/ 
http.createServer(function(req,res){
	if(req.url == '/'){
		let html = `
			<form method='POST' action='/login'>
				<p>姓名:<input name='user' ></p>
				<p>年龄:<input name='age'></p>
				<button type='submit'>提交</button>
			</form>
		`
		res.writeHead(200,{
			'Content-Type':'text/html;charset=utf-8'
		});
		res.write(html);
		res.end();
	}else if(req.url == '/login'){
		let body = '';
		req.on('data',function(chunk){
			body += chunk;
		})
		req.on('end',function(){
			body = querystring.parse(body);
			res.writeHead(200,{
				'Content-Type':'text/html;charset=utf-8'
			});
			res.write("姓名:" + body.user);
			res.write("年龄:" + body.age);
			res.end();
		})
	}
}).listen(5000);

console.log('server on the port 5000');
```

## Koa插件 
	
	koa-bodyParser
		koa 的获取 post 请求数据的方法
```js
...
if(ctx.path === '/login'){
	console.log(ctx.request.body);
	ctx.body = ctx.request.body;
}
```

	koa-router
		
```js
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

router.get('/',(ctx,next) => {
	ctx.body = 'Hello World';
})
app
	.use(router.routes())
	.use(router.allowedMethods());
	
app.listen(3000,() => {
	console.log('app starting at the port 3000');
})
```

	1. 如果需要在所有路由前面添加前缀, 可以在 new Router设置
```js
const router = new Router({
	prefix:'api'
});

访问 / 路由  ===> /api/
```