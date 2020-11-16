# Service Worker
    
    Service Wokers本质上充当Web应用程序 浏览器与网络之间的代理服务器。这个API旨在创建有效的离线体验。它会拦截网络请求并根据
    请求网络是否可用采用适当的动作，更新来自服务器的资源。它还提供入口以推送通知和访问后台同步API。
    
    Service Worker是一个注册在指定源和路径下的事件驱动worker。它采用JavaScript控制关联的页面或网站,拦截并修改
    访问和资源请求。细粒度的缓存资源。
    
    tips:
        1. Service worker运行在worker上下文，因此不能访问DOM。它运行在其他线程中,所以不会造成阻塞。
        2. 它设计为完全异步,同步API不能在service worker中使用。
        3. 出于安全考量,Service workers只能由https承载。或者localhost
    
    service worker 由事件驱动,遵守以下生命周期:
        下载/安装/激活
```js
// 注册一个serviceWorker服务
if('serviceWorker' in navigator){
  window.addEventListener('load',function(){
    navigator.serviceWorker.register('sw.js',{scope:'/'})
      .then(registration => {
        console.log(registration);
      }) 
      .catch(error => console.log(error));
  })
}
```    
    install     安装
        self.skipWaiting()  跳过等待
    activate    激活    
    fetch       对网页发起的请求进行拦截处理
```js
// sw.js   一个下载 激活和 监听fetch 的 sw文件
const CACHE_NAME = 'cache-v1';	// 定义一个缓存的版本;
self.addEventListener('install',function(event){
	event.waitUntil( event.open(CACHE_NAME).then(cache => {
		cache.addAll([
			'/','./style.css','./1.png'
		])	// 添加需要缓存的资源
	}).then(self.skipWaiting()) )
})

self.addEventListener('activate',function(event){
	event.waitUntil(caches.keys().then(cacheNames => {
		return Promise.all(cacheNames.map(cacheName => {
			if(cacheName !== CACHE_NAME){
				return caches.delete(cacheName);
			}
		}))
	}))
})

self.addEventListener('fetch',function(event){
	event.respondWith( caches.open(CACHE_NAME).then(cache => {
		return cache.match(event.request).then(response => {
			if(response){
				return response
			}
			return fetch(event.request).then(response => {
				caches.put(event.request,response.clone())
				return response;
			})
		})
	}) )
})
```
##  FetchEvent

    Service worker可以通过FetchEvent事件去响应请求.通过使用FetchEvent.respondWith方法,可以任意修改对于
    这些请求的响应。
    
    FetchEvent参数携带了 有关请求和结果响应的信息以及方法FetchEvent.respondWith()
        respondWith() 方法旨在包裹代码，这些代码来自受控页面的request生产自定义的response。
```js
self.addEventListener('fetch',function(event){
  event.respondWith(
    caches.match(event.request).then(response => {
      return response;
    })
  )
})
```
## Clients

	Clients接口的claim()方法允许一个激活的service worker将自己设置为其scope内所有clients的controller.
	
	语法:
		await clients.claim()
```js
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
```
    

    
    