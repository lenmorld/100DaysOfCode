// SOLUTION 1

document.addEventListener('keyup', function (e) {
	console.log(e.code, e.keyCode, e.key)

	// show key is playing
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`)
	// 2 ways: both work
	// 1. append to className
	// key.className = `${key.className} playing`
	// 2. DOMTokenList.add
	if (key) {
		key.classList.add("playing")
	}

	// play it!
	const audioKey = document.querySelector(`audio[data-key="${e.keyCode}"]`)
	// console.log(audioKey)
	if (audioKey) {
		audioKey.play().then(function () {
			// remove class
			console.log("done")
			debugger;
			if (key) {
				setTimeout(function () {
					key.classList.remove("playing")
				}, 100)
			}
		})
	}
})