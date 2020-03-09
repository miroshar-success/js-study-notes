# PWA
    Progressive Web Application 渐进式Web应用。
    在没有通过网络接受到更多功的数据前,仍可以提供基本的功能,(Offline First)。这是原生APP本来就支持的功能。
    
    PWA应用是指那些使用指定技术和标准模式来开发的web应用,这将同时赋予他们web应用和原生应用的特性。
        1. web应用更加易于发现--访问一个网站显然更加容易和迅速,并且可以通过一个链接来分享web应用。
        2. 原生应用与操作系统可以更加完美的整合,也因此为用户提供了无缝的用户体验。可以通过安装应用使得它在离线的状态下也可以运行。
    PWA赋予了我们同时拥有以上两种优势的应用的能力。
    
    1. 可以添加至主屏幕
    2. 实现离线缓存功能
    3. 实现了消息推送
    
    渲染网站主要有两种方法 -- 在服务器上或在客户端上。
        服务器渲染(SSR) server side render 意味着网站在服务器上渲染，因此它提供了更快的首次加载
        客户端渲染(CSR) client side render 允许在导航到不同页面时几乎立即在浏览器中更新网站,但在开始时需要
        更多的初始下载和客户端上的额外渲染。
    
        Service Worker
        Promise
        fetch
        cache API
        Notification API
        
*App shell*
    
    可以理解为程序的外壳，App shell意图尽快加载最小的用户界面，然后缓存它，以便在后续访问时可以离线使用,然后加载
    应用程序的所有内容。
    
## Service-Worker
    
    如果注册成功,service worker就在ServiceWorkerGlobalScope环境中运行,这是一个特殊类型的worker上下文运行环境，
    与主运行线程(执行脚本)相独立,同时也没有访问DOM的能力。
    
    steps:
        1. 最先发送给service worker的事件是安装事件(在这个事件里可以开始进行填充IndexDB和缓存站点资源)。
        2. 当oninstall 事件的处理程序执行完毕,可以认为service worker安装完成了
        3. service worker安装完成后,会接受到一个激活事件(activate event),主要用途是清理之前版本的service worker脚本中
        使用的资源。
        
    tips:
        1. service worker是一个JavaScript worker,不能直接操作DOM。但service worker可以通过postMessage接口与
        跟其相关的页面进行通信,发送消息。
        2. 不能访问 window等对象, 上下文对象为 self
```js
if("serviceWorker" in navigator){
    navigator.serviceWorker.register('./sw.js',function(registration){
        console.log("registration:",registration);
    },function(error){
        console.error(error);
    })
}
// 生命周期事件
self.addEventListener('install',event => {
    console.log(event);
})
self.addEventListener('activate',event => {
    console.log(event);
})
self.addEventListener('fetch',event => {
    console.log(event);
})
```
    install:
        event.waitUntil()
            passing a promise to extend the installing stage until the promise is resolved.
            
        self.skipWaiting()
            anytime before activation to skip installed stage and directly jump to activation stage without
            waiting for currently controlled clients to close.
    activate:
        event.waitUntil()
            passing a promise to extend the activating stage until the promise is resolved.
        self.clients.claim()
            in the activate handler to start controlling all open clients whihout reloading them()
            
## Cache API
```js
// 1. 判断 浏览器 是否支持 cache
if("caches" in window){
    console.log("caches support");
}   

// 2. 创建缓存对象
cache.open()

// 3. 添加缓存内容, add()方法只可以添加一个, addAll()方法可以添加多个
cache.add()  , cache.addAll()
    
// 4. 查看已经缓存的数据
caches.keys()

// 5. 匹配缓存文件路径
cache.match(), cache.matchAll()

// 6. 删除缓存
cache.delete()
 ```
*Demo*
```js
const CACHE_NAME = "cache-v2";
self.addEventListener('install',event => {
    // caches.open()    打开一个缓存空间
    event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    // 添加所有的缓存列表
        cache.addAll([
            '/',
            '/tong.jpeg',
            '/style.css'
        ])
    }))
})
self.addEventListener('activate',event => {
    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            if(cacheName !== CACHE_NAME){
                return caches.delete(cacheName);
            }
        }))
    }))
})
self.addEventListener('fetch',event => {
    event.respondWith(caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
            if(response) {
                return response;
            }
            return fetch(event.request).then(response => {
                cache.put(event.request,response.clone());
                return response;
            })
        })
    }))
})
```
        
## Notification API
    
    在页面上下文中发送消息的步骤:
    获取当前页面允许的授权:
        Notification.permission
        1. default 2. denied 3. granted
        
    Notification.requestPermission().then(permission => {
        console.log(permission);
    });
    
    创建一个通知提醒:
```js
new Notification("Hello World",{
    body:"This is from notification"
})
```
        
   在 service-worker 中使用notification:
        Notification.permission     denied
   
        不允许使用 new Notification()的方法创建消息通知,在service-worker中使用notification时,必须现在
        页面上下文中允许消息推送,然后使用
   
   self.registration.showNotification(title,?options);
                        参数和 在页面上下文中使用一样
        
       
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        