// console.log("offline")

// TODO: find a way to change h2 to : Offline!
// challenge is SW cannt access DOM
// - maybe postMessage?

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

// Fires after successful install
// self.addEventListener('activate', event => {
// 	console.log("sw activated!")
// 	event.waitUntil(
// 		caches.keys().then(cacheNames => {
// 			return Promise.all(
// 				cacheNames.map(cache => {
// 					if (cache !== cache_name) {
// 						console.log("Cleaning up old cache")
// 						return caches.delete(cache)
// 					}
// 				})
// 			)
// 		})
// 	)
// })

/* when a user navigates to a page that has a sw installed,
i.e. whenever a page controlled by this SW requests a resource.

It receives fetch events from each request, including:
- request for HTML page on first load
- JS, CSS, fonts, images
- request to other origins, as long as request originated on 
one of the clients (e.g. browser tabs) controlled by worker

event.respondWith
- promise passed here effectively replaces the fetch
i.e. if resolves, respond with that instead of going to the network

caches.match
- look for cached responses

respond with that instead
takes a promise caches.match
which looks at the request and 
- if match found, returns cache created by the sw
- else, it fetches the resource over the network
*/
self.addEventListener('fetch', event => {
	console.log("SW: fetching cached content")

	// ----  send message to client
	// Exit early if we don't have access to the client.
	// Eg, if it's cross-origin.
	// if (!event.clientId) return;

	// // Get the client.
	// clients.get(event.clientId).then(client => {
	// 	// Exit early if we don't get the client.
	// 	// Eg, if it closed.
	// 	if (!client) return;

	// 	if (event.request.mode === 'navigate') {
	// 		fetch("https://reqres.in/api/users?page=2")
	// 			.then(() => {
	// 				// online
	// 				// Send a message to the client.
	// 				client.postMessage({
	// 					msg: "SW: offline now",
	// 					offline: false,
	// 				});
	// 			})
	// 			.catch(() => {
	// 				// offline
	// 				client.postMessage({
	// 					msg: "SW: offline now",
	// 					offline: true,
	// 				});
	// 			})
	// 	}
	// })
	// // ----

	debugger;

	// event.respondWith(
	// 	caches
	// 		.match(event.request)  // returns promise that resolves to a cache entry matching the request
	// 		.then(cached => {
	// 			debugger;

	// 			// "eventually fresh", so we still fetch from network...
	// 			const networked = fetch(event.request)
	// 				// success, failure
	// 				.then(fetchedFromNetwork, unableToResolve)
	// 				// catch failure from fetchedFromNetwork
	// 				.catch(unableToResolve)

	// 			// return cached immediately if there is one,
	// 			// fallback waiting on network

	// 			console.log('SW: fetch ', cached ? '(cached)' : '(network)')

	// 			// ... but we return cached right away if it exists
	// 			return cached || networked;

	// 			function fetchedFromNetwork(res) {
	// 				// clone response to store on SW cache
	// 				// then reply to network request
	// 				const cacheCopy = res.clone()

	// 				debugger;

	// 				console.log('SW: fetch from network: ', event.request.url)

	// 				caches
	// 					.open(cache_name) // TODO: can also make new cache then cleanup in activate
	// 					.then(_cache => {
	// 						debugger;
	// 						// store response, which will be available later to caches.match(event.request) calls
	// 						_cache.put(event.request, cacheCopy)
	// 					})
	// 					.then(() => {
	// 						console.log('SW: fetch response stored in cache', event.request.url)
	// 					})

	// 				// fulfill promise with response
	// 				return res;
	// 			}


	// 			function unableToResolve() {
	// 				console.log('SW: fetch request failed in both cache and network')

	// 				return new Response('<h1>Ooops. Something went wrong</h1>', {
	// 					status: 503,
	// 					statusText: 'Service Unavailable',
	// 					headers: new Headers({
	// 						'Content-Type': 'text/html'
	// 					})
	// 				})
	// 			}
	// 		})
	// )

	// SIMPLIFIED VERSION v1 - still with eventual fresh
	// event.respondWith(
	// 	fetch(event.request)
	// 		.then(res => {
	// 			const copyCache = res.clone()
	// 			caches
	// 				.open(cache_name)
	// 				.then(cache => {
	// 					cache.put(event.request, copyCache)
	// 				})
	// 			return res;
	// 		})
	// 		.catch(error => caches.match(event.request).then(res => res))
	// )

	// SIMPLIFIED VERSION v2 - no eventual refresh, just cache || fetch
	event.respondWith(
		caches.match(event.request)
			.then(response => {
				return response || fetch(event.request)
			})
	)
})