# cookie

	HTTP Cookie 是服务器发送到用户浏览器并保存在本地的一小块数据,它会在浏览器下次向同一服务器发起请求时被携带并发
	送到服务器上。
	通常,它用于告知服务器两个请求是否来自同一浏览器。比如保持用户的登陆状态。Cookie使基于无状态的HTTP协议记录稳定
	的状态信息成为了可能。
	
	Cookie主要用于一下三个方面:
		1. 会话状态管理(比如用户登陆状态,购物车,游戏分数或其他需要记录的信息)
		2. 个性化设置(比如用户自定义设置,主题等)
		3. 浏览器行为跟踪(比如跟踪分析用户行为等)

## 创建cookie

	当服务器接收到HTTP请求时,服务器可以在响应头里添加一个 Set-Cookie 选项。浏览器收到响应后通常会保存下Cookie,之后对该服务器
	每一次请求中都通过Cookie请求头部将Cookie信息发送给服务器。
	
	Cookie的过期时间, 域 路径, 有效期 适用站点都可以根据需要来指定。

```js
// node.js 设置response cookie

response.setHeader('Set-Cookie',['type=ninja','language=javascript'])
```
	Set-Cookie: <cookie-name>=<cookie-value>
	
	第一次请求时,request 头部是不含cookie信息的,此时服务器会下发一个cookie,当浏览器再次访问同一个服务器时, request header
	会携带 上一次请求服务器下发的cookie
	
	第一次请求时 request 和 response
![request]('https://github.com/JayK0720/Front-End/blob/master/102-cookie%E5%92%8Csession/imgs/set-cookie.png')

	第二次请求时 request 和 response
![request]('https://github.com/JayK0720/Front-End/blob/master/102-cookie%E5%92%8Csession/imgs/cookie.png')
	
## Cookie有效期

	会话期Cookie:

	会话期Cookie是最简单的Cookie,浏览器关闭之后它会被自动删除,它仅在会话期内有效。会话期Cookie不需要指定过期时间(Expires) 
	或者有效期(Max-Age)。 
	
	tips:
	1. 有些浏览器提供了会话恢复功能,这种情况下即使关闭了浏览器,会话期Cookie也会被保留下来,就好像浏览器从来没有关闭一样。
	
	持久性Cookie：
	持久性Cookie可以指定一个特定的过期时间(Expires)或有效期(Max-Age)。
	
	tips:
	1. 当Cookie的过期时间被设定时,设定的日期和时间只与客户端有关,而不是服务端。
	
## Cookie的Secure和HttpOnly标记

	标记为Secure的Cookie只应通过被HTTPS协议加密过的请求发送个服务端。但即便设置了Secure标记,敏感信息也不应该通过Cookie
	传输。
	
	JavaScript的Document.cookie API 无法访问带有HttpOnly标记的Cookie,它们只应该发送给服务端。 
	如果包含服务端Session信息的Cookie不想被客户端JavaScript脚本调用,那么就应该为其设置HttpOnly标记。
	
# cookie-parser

    解析cookie的中间件
    npm install cookie-parser --save
```js
const cookieParser = require("cookie-parser");
server.use(cookieParser());

server.get("/",(req,res)=>{
  res.cookie(name,value,{
      maxAge:1000,
  })  
})    
```


	

    