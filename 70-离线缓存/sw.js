self.addEventListener('fetch',function(e){
	e = e || window.e;
	e.respondWith(fetch('test.html'));
})