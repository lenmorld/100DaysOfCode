const fs = require('fs');
const exec = require('child_process').exec;

const writeCommands = function (file, data) {

	return new Promise((resolve, reject) => {
		const writerStream = fs.createWriteStream(file);

		data.forEach(line => {
			writerStream.write(`${line}\n`);
		});

		writerStream.end();

		writerStream.on('finish', () => {
			console.log("Write completed");
			resolve();
		})

		writerStream.on('error', () => {
			console.log(err.stack);
			reject();
		});

		console.log("End of write")
	});
}

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

// MAIN

const fileName = 'git.sh';

// const branches = ['c4.3', 'c4.4', 'c4.5', 'c4.6', 'c4.7', 'c4.8', 'c4.9', 'c4_challenge', 'c4_solution'];
const branches = ['c4.6', 'c4.7', 'c4.8', 'c4.9'];

// const branches = ['c4.3', 'c4.4', 'c4.5'];

const lines = [];

// lines.push(`cd ../node_workshop/`);
lines.push(`cd ../../node_workshop_client/node_workshop`);
lines.push(`pwd`);
lines.push(`git status`);

// LOOP THROUGH BRANCHES
let i;
// 5, goes from 0->3, 0to1, 1to2, 2to3, 3to4  
for (i = 0; i < branches.length - 1; i++) {
	const src = branches[i];
	const dest = branches[i + 1];

	lines.push(`### MERGING ${src} into ${dest} ###`)
	lines.push(`echo MERGING ${src} into ${dest}`)
	lines.push(`git checkout ${dest}`)
	lines.push(`git merge ${src}`)
	lines.push(`git push origin ${dest}`)
}

lines.push(`git status`);

writeCommands(fileName, lines).then(() => {
	execProcess(`sh ${fileName}`, (err, response) => {
		if (!err) {
			console.log(response);
		} else {
			console.log(err);
		}
	});
});