const CACHE_NAME = 'cache-v1';
self.addEventListener('install',event => {
    console.log('install:',event);
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                '/',
                '/style.css',
            ])
        })
    )
})
self.addEventListener('activate',event => {
    console.log('activate',event);
});

self.addEventListener('fetch',event => {
    console.log("fetch",event);
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
});















