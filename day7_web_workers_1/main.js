(function () {

	let worker;

	const main_thread_compute = function () {
		console.log("SINGLE THREAD COMPUTING....")
		let i = 0;
		while (i < 400000) {
			// console.log(`The number is ${i}`)

			document.querySelector('#output').innerHTML = `<p>current number is: ${i} </p>`

			i++
		}
		console.log("SINGLE THREAD COMPUTING DONE");
	}

	const worker_thread_compute = function () {
		console.log("WORKER THREAD COMPUTING....")

		worker = new Worker('worker.js');
		worker.onmessage = function (event) {
			// console.log(event.data)

			document.querySelector('#output').innerHTML = `<p>current result from worker is: ${event.data} </p>`
		}
	}

	const terminate_worked_thread = function () {
		worker.terminate();
		worker = undefined;
	}


	const test_responsive = function () {
		alert(`I'm responsive! `);
	}

	const main_to_worker = function () {
		// send message to worker
		worker.postMessage("hey hows it going")
	}

	document.querySelector('#main-thread-compute').addEventListener('click', main_thread_compute)

	document.querySelector('#worker-thread-compute').addEventListener('click', worker_thread_compute)

	document.querySelector('#worker-thread-terminate').addEventListener('click', terminate_worked_thread)

	document.querySelector('#test-responsive').addEventListener('click', test_responsive)

	// document.querySelector('#main-to-worker-data').addEventListener('click', main_to_worker)

})()