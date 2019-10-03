# JSONP

	Jsonp(JSON with padding) 是一种‘使用模式’，可以让网页从其他的域名下获取资料，即跨域读取数据。
	
	Jsonp 实际是通过script标签的src属性 可以跨域获取数据，后台通过返回一个函数调用，将数据作为参数返回到前台，然后js通过
	函数调用，传递一个形参获取数据。
	
![jsonp](https://github.com/webmodules/jsonp)