console.log("1");

setTimeout(function () {
	console.log("2");
})

console.log("3");

setTimeout(function () {
	console.log("5");
}, 1000)

setTimeout(function () {
	console.log("4");
})

