# Service Worker
    
    Worker接口是Web Workers API的一部分,指的是一种可由脚本创建的后台任务，任务执行中可以向其创建者收发信息。
    
    
    Service Worker是一个注册在指定源和路径下的事件驱动worker。它采用JavaScript控制关联的页面或网站,拦截并修改
    访问和资源请求。细粒度的缓存资源。
    
    Service worker运行在worker上下文，因此不能访问DOM。它运行在其他线程中,所以不会造成阻塞。它设计为完全异步,同步
    API不能在service worker中使用。
    
    service worker 遵守以下生命周期:
        下载
        安装
        激活
    
    Service worker可以通过FetchEvent事件去响应请求.通过使用FetchEvent.respondWith方法,可以任意修改对于
    这些请求的响应。
    
    
    
    
    
    