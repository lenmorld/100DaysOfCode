const triggers = document.querySelectorAll('a')
const highlight = document.createElement('span')

highlight.classList.add('highlight')

// so there's only one at a time
document.body.append(highlight)

triggers.forEach(trigger => {
	trigger.addEventListener('mouseenter', function (e) {
		// console.log(this)
		const linkCoords = this.getBoundingClientRect()
		console.log(linkCoords)
		highlight.style.width = `${linkCoords.width}px`
		highlight.style.height = `${linkCoords.height}px`

		// add how much it is scrolled, X or Y
		highlight.style.transform = `translate(${linkCoords.left + window.scrollX}px, ${linkCoords.top + window.scrollY}px)`
	})
})


// document.addEventListener('mouseover', function (e) {
// 	// console.log(e.target.nodeName)

// 	if (e.target.nodeName === 'A') {
// 		// e.target.style.background = "black"
// 		// e.target.style.color = "white"
// 		e.target.classList.add('highlight')
// 	}
// })

// document.addEventListener('mouseout', function (e) {
// 	// console.log(e.target.nodeName)

// 	if (e.target.nodeName === 'A') {
// 		e.target.classList.remove('highlight')
// 		// e.target.style.background = "black"
// 		// e.target.style.color = "white"
// 	}
// })