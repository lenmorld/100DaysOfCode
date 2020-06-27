console.log(123)

if ('serviceWorker' in navigator) {
	console.log("Main: SW supported!")

	navigator.serviceWorker.register("./serviceWorker.js").then(result => {
		console.log('Main: SW successfully registered!', result)
	}).catch(err => {
		console.log("Main: Error registering SW", err)
	})
}

function online() {
	console.log('Main: online');
	document.querySelector('h2').innerHTML = "I'm online!"
	document.querySelector('img#offline').style.display = "none"
	document.querySelector('img#online').style.display = "block"
}

function offline() {
	console.log('Main: offline');
	document.querySelector('h2').innerHTML = "zzzz... offline..."

	// works after switch, but still needed postMessage after refresh while on offline mode
	document.querySelector('img#online').style.display = "none"
	document.querySelector('img#offline').style.display = "block"
}

if (navigator.onLine) {
	online()
}

window.addEventListener('offline', function (e) {
	offline()
});

window.addEventListener('online', function (e) {
	online()
});

// navigator.serviceWorker.addEventListener('message', event => {
// 	// console.log(event.data.msg, event.data.url);
// 	console.log(event.data.msg);

// 	if (event.data.offline) {
// 		offline()
// 	}
// });

// fetch('https://reqres.in/api/users?page=2').then(
// 	data => data.json()
// ).then(
// 	res => {
// 		// console.log(res.data)
// 		document.querySelector("#data").innerHTML = JSON.stringify(res.data)
// 	}
// )