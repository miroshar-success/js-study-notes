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
    
	Canvas画布
	绘制基本图形：
		ctx.fill()/ctx.stroke()/ctx.rect()
		ctx.arc(x,y,r,0,2*Math.PI,false);
	绘制文本:
		ctx.font = '30px Arial';	
		ctx.fillText('hello world',x,y);/ctx.strokeText('hello world',x,y);
		ctx.textAlign/ctx.textBaseline
		ctx.direction
	绘制线段:
		ctx.moveTo(startX,startY)/ctx.lineTo(x,y);
		ctx.lineCap='butt/round/square'; ctx.lineJoin='round/miter'
		ctx.setLineDash([lineWidth,lineCap])	传递一个数组,分别表示线宽和间隔
	样式:
		ctx.fillStyle()/ctx.strokeStyle()
	阴影:
		ctx.shadowColor/ctx.shadowOffsetX/ctx.shadowOffsetY/ctx.shadowBlur
	清除:
		ctx.clearRect(x,y,width,height);
	路径:
		ctx.beginPath()	清空子路径列表开始一个新的路径。
		ctx.closePath()	使笔点返回到当前子路径的起点。
	变换:
		ctx.scale()/ctx.transform()/ctx.translate()/ctx/rotate()默认以(0,0)点开始旋转
	绘图
		ctx.drawImage(image,dx,dy);
		ctx.drawImage(image,dx,dy,dWidth,dHeight);
		ctx.drawImage(image,sx,sy,sWidth,sHeight,dx,dy,dWidth,dHeight);
	像素控制：
		ctx.createImageData();
		ctx.getImageData();
		ctx.putImageData();
	状态:
		ctz.save()			// 使用栈保存当前的绘画样式状态
		ctx.restore()		// 恢复到最近的绘制样式状态
	合成:
		ctx.globalAlpha	// 设置透明度
			
[学习canvas,一篇文章就够了](https://www.runoob.com/w3cnote/html5-canvas-intro.html)
[CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
[canvas教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_usage)

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
     
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    