
# Vue钩子函数

	beforeCreate
	created: 在实例创建完成后被立即调用。在这一步，实例已经完成以下的配置：数据观测(data observer)，
	属性和方法的运算，watch/event事件回调。
	
	beforeMount
	mounted
		mounted不会承诺所有的子组件也都一起被挂载。如果你希望等整个视图都渲染完毕，可以用vm.nextTick替换掉mounted
	beforeUpdate
	updated
	beforeDestroy
	destroyed
	
![声明周期]('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554225707415&di=709598ce9796add42eb1630d21d7a7b4&imgtype=0&src=http%3A%2F%2Fblog.hinablue.me%2Fcontent%2Fimages%2F2018%2F01%2Flifecycle.png')

# axios

	Axios是一个基于promise的HTTP库，可以用在浏览器和node.js中
	
	在vue中引入axios
		1. npm install axios
		2. import Axios from "axios"
		3. Vue.prototype.$axiso = Axiso

	特点:
	1. 从浏览器中创建XMLHttpRequests
	2. 从Node.js创建http请求
	3. 支持Promise API
	4. 拦截请求和响应
	5. 转换请求数据和响应数据
	6. 取消请求
	7. 自动转换JSON数据
	8. 客户端支持防御XSRF

## get请求

```js
axios.get("/user?id=1233")
.then(function(response){
	console.log(response)
})
.catch(function(err){
	console.log(err);
});

// 也可以将参数写在params对象里
axios.get("/user",{
	params:{
		id:12345
	}
})
.then(function(response){
	console.log(response);
})
.catch(function(err){
	console.log(err);
})
```

## 响应结构

	某个请求的响应包含以下信息
```js
{
	// 由服务器提供的响应
	data:{},
	// 来自服务器响应的HTTP状态码
	status:200,
	// statusText 来自服务器响应的HTTP状态信息
	 statusText:"OK",
	// headers:服务器响应的头
	 headers:{},
	// config是为请求提供的配置信息
	 config:{}
}
```

## 全局Axios配置和拦截器

	axios.defaults.baseURL = 'https://api.example.com';
	axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	
	
	拦截器:
	在请求或响应被then或catch处理前拦截它们。
```js
// 添加请求拦截器
axios.interceptors.request.use(function(config){
	return config;
},function(error){
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response){
	// 对响应数据做点什么
	return response;
},function(error){
	return Promise.reject(error);
})
```