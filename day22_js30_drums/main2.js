// SOLUTION 2

function playSound(e) {
	// add .playing class
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`)
	if (!key) {
		return
	}
	// console.log(key)
	// OR key.className = `${key.className} playing`
	key.classList.add("playing")
	// play audio
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`)
	// console.log(audio)
	if (!audio) {
		return
	}
	audio.currentTime = 0  // rewind first, so holding key results to multiple keydowns
	audio.play()
	// BETTER TO USE CSS event transitionend 
	// setTimeout(function () {
	// 	key.classList.remove("playing")
	// }, 100)
}

function removeTransition(e) {
	// console.log(e)

	// lots of transition events, we only use 'transform'
	if (e.propertyName === 'transform') {
		// 'this' = e.target, which is the divKey
		this.classList.remove('playing')
	}
}

// add transitionend to all div keys
const divKeys = document.querySelectorAll('.key');
// console.log(divKeys)
divKeys.forEach(divKey => {
	divKey.addEventListener('transitionend', removeTransition)
})

// keydown allows automatic debouncing, vs keyup
document.addEventListener('keydown', playSound)
