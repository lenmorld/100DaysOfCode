const express = require('express');
const axios = require('axios')
const app = express();
const port = 5000

const webhooks_client_list = []

const SERVICE_ID = 'WEBHOOK_SERVICE_1234'

app.get('/', (req, res) => {
	res.send('SERVER OK');
});

app.get('/register', (req, res) => {
	// TODO: actual registration of client
	// ideally client sends some info and a SECRET
	// that service sends along with the webhook
	// so the client can later verify that it's from this server
	console.log('registering a new webhook client');

	// TODO: in reality, this gets saved to a DB or cache
	const client = {
		id: 1,
		url: 'http://localhost:4000/webhooks'
	}

	// add to list of clients
	webhooks_client_list.push(client)

	// send a "ping" to new client
	axios.post(client.url, {
		message: `## Ping from ${SERVICE_ID}: registration success`
	})

	res.send('registration success')
});

app.listen(port, () => {
	console.log("<<< WEBHOOKS SERVER >>>")
	console.log(`Listening on port ${port}`)
	serverThings()
})

function serverThings() {
	console.log("computations... server things ...")

	// FIXME: runs every 5 seconds, but in real life
	// there's a message/event broker here or something
	setInterval(() => {
		if (webhooks_client_list.length) {
			console.log("Event happened and there are clients")

			webhooks_client_list.forEach(client => {
				console.log(`Post to webhook URL of ${client.url}`)
				axios.post(client.url, {
					message: `## Webhook ⚓🐟 event 1234 from ${SERVICE_ID}`
				})
			})
		} else {
			// console.log("NO CLIENTS")
		}
	}, 7000)

}
