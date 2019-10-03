# service-worker

	注册一个 serviceWorker事件
	window.navigator.serviceWorker.register('sw.js')
	
	在sw.js文件里监听
	self.addEventListener('fetch',function(e){
		// 拦截向服务器发送请求并 请求fetch里的页面
		e.respondWith(fetch('test.html'));
	})