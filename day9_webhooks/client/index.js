const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('CLIENT OK');
});

app.post('/webhooks', (req, res) => {
	console.log(req.body)
	res.send('OK');
});

app.listen(port, () => {
	console.log(`Listening for webhooks on port ${port}`)
})