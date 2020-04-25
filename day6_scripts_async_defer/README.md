```html
<html>
	<head>
		<script
			defer
			src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.7.9/angular.js"
		></script>
		<script defer src="script1.js"></script>
	</head>

	<body>
		some content in HTML
	</body>
</html>
```

```javascript
(function () {
	// we can't even do this when script is loaded from <head>
	// since app div in <body> is not loaded yet
	// document.getElementById('app').innerHTML = "content from script1";
	// document.querySelector('body').innerHTML += "content from script"
	// console.log("script: number of characters in html", document.querySelector('html'))
	// console.log('script:', document.querySelector('html').innerText);

	for (let index = 0; index < 111111111; index++) {
		const element = index;
	}

	const currentText = document.querySelector("html").innerText.split(" ");

	console.log("script:", currentText[currentText.length - 1]);
})();
```
