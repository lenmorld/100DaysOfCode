(
	function () {
		// do some really long computation
		for (let index = 0; index < 111111111; index++) {
			const element = index;
		}

		// print the last word in the HTML right now
		// this lets us know if page finished parsing
		const currentText = document.querySelector('html').innerText.split(" ");
		console.log('script:', currentText[currentText.length - 1]);
	}
)()