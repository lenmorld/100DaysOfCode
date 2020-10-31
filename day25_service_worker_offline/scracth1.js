// console.log("offline")

const CACHE_NAME = "sw-cache"

self.addEventListener('install', event => {
	console.log("<<< SW INSTALLED! >>>")

	// code executes whenever sw gets installed for the first time

	// cache files
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(cache => {
				console.log("<<< Sw: caching files... >>>")
				// *cache only static files that rarely change, link fonts and images
				// return ...
				cache.addAll([
					'./images/patrick.jpg',
					'./style.css'
				])
			})
			.then(() => {
				self.skipWaiting()
			})
	)
})

// Active 
self.addEventListener('activate', event => {
	console.log("sw activated!")
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames.map(cache => {
					if (cache !== CACHE_NAME) {
						console.log("Cleaning up old cache")
						return caches.delete(cache)
					}
				})
			)
		})
	)
})

/* when a user navigates to a page that has a sw installed, it will start to receive fetch events from each request

event.respondWith takes a promise caches.match
which looks at the request and 
- if match found, returns cache created by the sw
- else, it fetches the resource over the network
*/
self.addEventListener('fetch', event => {
	console.log("SW: fetching cachec content")
	event.respondWith(
		fetch(event.request)
			.then(res => {
				const copyCache = res.clone()
				caches
					.open(CACHE_NAME)
					.then(cache => {
						cache.put(event.request, copyCache)
					})
				return res;
			})
			.catch(error => caches.match(event.request).then(res => res))
	)
	// event.respondWith(
	// 	caches.match(event.request).then(response => {
	// 		return response || fetch(event.request)
	// 	})
	// )
})