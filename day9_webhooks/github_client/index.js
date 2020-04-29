const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4567

// ## GITHUB WEBHOOKS ##
// https://developer.github.com/webhooks/creating/
// #####################

app.use(bodyParser.json()); // Content-Type of webhook received is JSON

// set in Github, we'll receive this in
// X-Hub-Signature header in the webhook POST request
// so we can verify that the webhook came from our repo in Github
const secret = 'SECRET_1234';

// Events - wide selection here: https://developer.github.com/webhooks/#events
// but we'll stick with default 'push'

app.get('/', (req, res) => {
	res.send('GITHUB CLIENT OK');
});


// Payload URL - URL of server that will receive the webhook POST requests
// it will go to http://localhost:4567/payload
app.post('/payload', (req, res) => {
	// console.log(req.body)

	// req.body has all the info from the commit
	// GO CRAZY!

	// Object.keys(req.body)
	console.log("Repo: ", req.body.repository.full_name)
	console.log("Owner: ", req.body.repository.owner.email)
	console.log("Commit message: ", req.body.commits[0].message)

	res.send('OK');
});

app.listen(port, () => {
	console.log(`Listening for webhooks on port ${port}`)
})