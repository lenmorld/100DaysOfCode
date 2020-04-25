onmessage = function (event) {
	// since this is "queued" to the console, this appears at the end
	// even if it's clicked before done
	console.log(`>>> message from Main thread: ${event.data}`)
}

// job of the worker thread

let i = 0;
while (i < 400000) {
	// debugger;
	// worker thread still have access to console
	// WARNING: this overwhelms the console a bit
	// console.log(`worker thread console: The number is ${i}`)

	// send to main thread
	postMessage(`The number is ${i}`);
	i++;
	// NO ACCESS TO LOCALSTORAGE. THIS DOESNT WORK
	// localStorage.setItem('current', i)
}

// console.log(`DONE! last number is ${i}`)