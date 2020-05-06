function load() {
	console.log("=== sending GET request ===")

	const xhr = new XMLHttpRequest()

	xhr.onreadystatechange = function () {
		console.log("xhr.readyState: ", xhr.readyState)
		console.log("xhr.status: ", xhr.status, xhr.statusText)

		// 4 = request finished and response is ready
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log("responseXML", xhr.responseXML)
			document.querySelector('#content').innerHTML = xhr.responseText
		}
	}

	// fire
	xhr.open('GET', 'https://reqres.in/api/users')
	xhr.send()
}

function send() {
	console.log("=== sending POST request ===")
	const xhr = new XMLHttpRequest()

	xhr.onreadystatechange = function () {
		console.log("xhr.readyState: ", xhr.readyState)
		console.log("xhr.status: ", xhr.status, xhr.statusText)

		// 4 = request finished and response is ready
		if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
			console.log("responseXML", xhr.responseXML)
			console.log("responseText", xhr.responseText)
			document.querySelector('#content2').innerHTML = xhr.responseText
		} else {
			// alert("error or redirect: ", xhr.status)
		}
	}

	// fire
	xhr.open('POST', 'https://reqres.in/api/users')
	xhr.setRequestHeader("Content-Type", "application/json")
	xhr.send('{"id": 1, "name": "Lenny"}')
}