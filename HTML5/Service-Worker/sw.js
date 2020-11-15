// const name = 'my-cache';
// const list = [
// 	'./sw.html',
// 	'./sw.js'
// ]

self.addEventListener('fetch',function(event){
	console.log('request:',event.request);
	// event.respondWith(
	// 	caches.match(event.request).then(response => response || fetch(response))
	// );
	// 拦截到请求
	event.respondWith(fetch('./sw.html'));
})