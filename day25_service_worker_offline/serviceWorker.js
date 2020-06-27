const cache_name = "sw-cache"

// static HTML, images, css
const files_to_cache = [
	'/',
	'./images/patrick.jpg',
	'./images/patrick_sleep.jpg',
	'./style.css'
]

self.addEventListener('install', event => {
	console.log("SW: installing...")

	// code executes whenever sw gets installed for the first time

	// cache files
	event.waitUntil(
		caches
			.open(cache_name)
			.then(cache => {
				console.log("SW: caching files...")
				// fetch these files, then cache
				cache.addAll(files_to_cache);
			})
			.then(() => {
				console.log("SW: installed successfully. Files cached!")
				self.skipWaiting()
			})
	)
})

self.addEventListener('fetch', event => {
	console.log("SW: fetching cached content")
	// SIMPLIFIED VERSION - no eventual refresh, just cache || fetch
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				return response || fetch(event.request)
			})
	)
})