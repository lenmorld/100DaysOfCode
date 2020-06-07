const container = document.querySelector('.container')
const text = document.querySelector('#text')

// ms
const TOTAL_TIME = 7500
const BREATH_TIME = (TOTAL_TIME / 5) * 2
const HOLD_TIME = TOTAL_TIME / 5

breatheAnimation()

function breatheAnimation() {
	container.className = "container grow"

	// Inhale
	text.innerHTML = "Inhale..."
	setTimeout(() => {
		text.innerHTML = 'Hold'

		// Exhale
		setTimeout(() => {
			text.innerText = 'Exhale...'
			container.className = 'container shrink'
		}, HOLD_TIME)

	}, BREATH_TIME)
}

setInterval(breatheAnimation, TOTAL_TIME)


// pause/resume
const playbackButton = document.querySelector('#playback');
const audio = document.querySelector('audio');
let isPlaying = false

audio.pause()

playbackButton.addEventListener('click', () => {
	if (isPlaying) {
		// pause
		playbackButton.innerHTML = '🔊'
		audio.pause()
	} else {
		playbackButton.innerHTML = '🔇'
		audio.play()
	}
	isPlaying = !isPlaying
})