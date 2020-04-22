const exec = require('child_process').exec;

const execProcess = function (command, cb) {
	exec(command, function (err, stdout, stderr) {
		if (err != null) {
			return cb(new Error(err), null);
		} else if (typeof (stderr) != "string") {
			return cb(new Error(stderr), null);
		} else {
			return cb(null, stdout);
		}
	});
}

// exports.result = result;
// var execProcess = require("./exec_process.js");
execProcess("sh temp.sh", function (err, response) {
	if (!err) {
		console.log(response);
	} else {
		console.log(err);
	}
});