(function () {

	let worker;

	const main_thread_compute = function () {
		console.log("MAIN THREAD COMPUTING....")
		let i = 0;
		while (i < 60000) {
			console.log(`The number is ${i}`)
			i++
		}
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
		// send message to worker
		worker.postMessage('hey how are you')

		alert(`I'm responsive! `);
	}

	document.querySelector('#main-thread-compute').addEventListener('click', main_thread_compute)

	document.querySelector('#worker-thread-compute').addEventListener('click', worker_thread_compute)

	document.querySelector('#worker-thread-terminate').addEventListener('click', terminate_worked_thread)

	document.querySelector('#test-responsive').addEventListener('click', test_responsive)

})()