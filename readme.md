# HTML5

    调用视频设备 navigator.mediaDevices.getUserMedia()
    
[mediaDevices.getUserMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia)

    前端路由: hash路由和history路由:
        重要的方法： history.go()/history.back()/history.forward()
        
				history.pushState(state,title,url);
				history.replaceState(state,title,url);
				
		 onpopstate  会监听 go()/back()/forward()操作

		 window.onhashchange = function(){}     // 监听hash值改变,可以通过location.hash 获取或设置
                 
[window.location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location)
[window.history](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)
    

# PWA

    离线存储    Service Worker
[service worker基本使用](https://googlechrome.github.io/samples/service-worker/basic/index.html)     
[w3c-service-worker](https://w3c.github.io/ServiceWorker/#motivations)
```js
// sw.js
// 一个service worker demo
const CACHE_NAME = 'cache-v1';

self.addEventListener('install',function(event){
	event.waitUntil(caches.open(CACHE_NAME).then(cache => {
		cache.addAll([
			'./',
			'./index.css',
			'./1.png'
		])	// 添加需要缓存的咨询路径
	}).then(self.skipWaiting()))
})

self.addEventListener('activate',function(event){
	event.waitUntil(caches.keys().then(cacheNames => {
		return Promise.all(cacheNames.map(cache => {
			if(cacheName !== CACHE_NAME){
				return caches.delete(cacheName)
			}
		}))
	}).then(() => self.clients.claim()))
})

self.addEventListener('fetch',function(event){
	event.respondWith(
		caches.open(CACHE_NAME).then(cache => {
			return cache.match(event.request).then(response => {
				if(response) { return response }
				return fetch(event.request).then(response => {
					cache.put(event.request,response.clone());
					return response;
				})
			})
		})
	)
})
```
		Notification		通知
			Notification.permission		获取当前是否开启通知权限	default/denied/granted
		发送一个通知
		1. 在页面上下文中: new Notification('hello notification',{body:"通知的内容"})
    2. 在serviceWorker中: self.registration.showNotification('hello notification',{body:'通知的内容'})
	
# Vue
		
		内置组件: keep-alive	transition
		选项: mixins
		生命周期函数: activated
		
# 工具
    
    1. serve:   
        
    Assuming you would like to serve a static site,single page application or just a static file,this package
    is just the right choice for you.
    
    Usage:
        yarn global add serve  &&  serve or serve folder_name
     
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    