
# 1. 跨域
	
	协议,域名,端口都相同的为同一个域，出于浏览器的同源限制策略，浏览器会拒绝跨域请求。
	
	http://www.baidu.com	端口默认80
	https//www.baidu.com	端口默认443
	
# 2. 解决跨域的方法

	1. CROS	
	在后台设置头信息 Access-Control-Allow-Origin
```
// example 
const express = require('express');
const app = express();

app.use(function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Credentials',true);
	res.header('Access-Control-Allow-Methods','post');
})
```

	2. jsonP  本质上是 script 标签请求后台
		2.1  创建一个函数
		2.2  把函数名字通过script标签传递给后台
		2.3  后台接受到传递的函数名字,再将要传递的数据传递给函数作为参数返回给前台
		2.4  前台通过函数执行 获取传递的数据

	