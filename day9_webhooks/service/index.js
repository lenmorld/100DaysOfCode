const express = require('express');
const axios = require('axios')
const app = express();
const port = 3001

const webhooks_client_list = []

app.get('/', (req, res) => {
	res.send('SERVER OK');
});

app.get('/register', (req, res) => {
	// TODO: actual registration of client
	console.log('registering a new webhook client');

	const client_url = `http://localhost:4000/webhooks`
	webhooks_client_list.push(client_url)
	res.send('ok')
});

app.listen(port, () => {
	console.log(`Listening for webhooks on port ${port}`)
	serverThings()
})

function serverThings() {
	console.log("computations... server things ...")

	console.log("event happened. sending webhook event to clients")

	// FIXME: runs every 5 seconds, but in real life
	// there's a message/event broker here or something
	setInterval(() => {
		if (webhooks_client_list.length) {
			// setTimeout(() => {
			webhooks_client_list.forEach(client => {
				console.log("Post to webhook URL!")
				axios.post(client, {
					message: 'OK!'
				})
			})
			// }, 5000)
		} else {
			console.log("NO CLIENTS")
		}
	}, 5000)

}
