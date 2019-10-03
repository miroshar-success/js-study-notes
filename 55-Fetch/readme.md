
# 1. Fetch API

    Fetch提供了一个JavaScript接口,用于访问和操纵HTTP管道的部分.它还提供了一个全局fetch()方法,该方法提供了一种简单,
    合理的方式来跨网络异步获取资源。

    fetch 与 jquery.ajax()区别：
        1. 当接收到一个代表错误的HTPP状态码时,从fetch()返回的Promise不会被标记为reject,即使该HTTP响应的状态码是404
        或500.相反，它会将Promise状态标记为resolve(但是会将resolve的返回值的ok属性设置为false),仅当网络故障时或请求
        被阻止时,才会标记为rejiect

        2. 默认情况下,fetch不会从服务端发送或接收任何cookies,如果站点依赖于用户session,则会导致未经认证的请求(要
        发送cookies,必须设置credentials选项)。

## 1.1. example

    最简单的方法是只提供一个参数用来指明想fetch()到的资源路径
```js
fetch('http://example.js').then(function(response){
    return response.json()
})
.then(function(myJson){
    console.log(myJson);
})
```
	还有其他方法来处理不同类型的响应。如果请求一个XML格式文件,则调用response.text。如果请求图片,使用response.blob方法
	所有这些方法返回另一个Promise,所以可以调用.then方法处理我们转换后的数据。
	
## 支持的请求参数

```js
	fetch("http://example.com",{
		body:JSON.stringify(data),	// must match 'Content-Type' header
		cache:'no-cache',
		credientials:'same-origin',
		headers:{
			'user-agent':'Mozilla/4.0 MDN Example',
			'content-type':'application/json',
		},
		method:'POST',
	})
```
	method: 请求使用的方法,如GET POST，
	headers: 请求的头信息
		tips: 后台获取fetch方法携带的cookie 可以通过 req.headers.cookie
			  后台设置下发cookie时 可以使用 res.header('Set-cookie','key1=value1&&key2=value2');
	body: 请求的Body信息
	mode: 请求的模式,如cors no-cors same-origin
	credentials: omit(默认值,忽略cookie) same-origin(只能同域发送) 或者include(可以跨域发送)。 为了在当前域名内自动发送cookie,必须提供这个选项

	tips: 
	1. 如果要让浏览器发送包含凭证的请求(即使是跨域源),要将 credentials:'include' 添加到fetch请求的参数里
	2. 如果只想在请求URL 与 调用脚本位于同一起源处时发送凭据,添加 credentials:'same-origin'
	
	通过post传递数据的时候,需要设置响应头为 'application/x-www-form-urlencoded'
	body的传递的数据也需要转化为 key=value1&key=value2 的形式,
```js
fetch(`http://localhost:3000/api/post`,{
	method:'POST',
	headers:{
		'Content-Type':'application/x-www-form-urlencoded'
	},
	body:'firstName=kyrie&lastName=irving'
})
.then(res => {
	return res.json();
})
.then(data => {
	console.log(data);
})
```

## 1.2. json()/text()/blob()/formData()
	
	Boyd mixin的json()方法使用一个Response流,并将其读取完成。它返回一个promise,解析结果是将文本体解析为JSON。
```js
fetch('http://localhost:3000/')
.then( response => response.json() )
.then( data => {
	console.log(data);
})
```
	text()方法提供一个可供读取的'返回流',返回结果的编码为UTF-8
	blob()返回解决一个Blob表示的请求主题的promise
	
## 1.3. Response
	
	返回的response对象属性：
	headers:Headers
	ok:200
	status:true
	statusText:'OK'
	type:'basic'
	url:'http://localhost:3000'
	
	原型上有一些方法：blob()	formData()	json()	text()	clone()

# 2. fetch()

    fetch()用于发起获取资源的请求。它返回一个promise,这个promise会在请求响应后被resolve,并传回Response对象。

    构造函数
    Response.Response()

    Promise<Response> fetch(input[,init]);

    init:
        method:     请求使用的方法:GET POST
        headers:    请求的头信息
        body:       请求的body信息
        mode:       请求的模式,如cors no-cors same-origin
        credentials 为了在当前域名内自动发送cookie,必须提供这个选项.
```js
fetch('http://localhost:3000',{
	method:'post',
	credentials:'include' 	// 发送cookies
})
```

	除了传给fetch() 一个资源的地址,还可以通过使用 Request() 构造函数来创建一个request对象,然后再作为参数传递给fetch();
