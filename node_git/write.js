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
// const branches = ['c4.6', 'c4.7', 'c4.8', 'c4.9'];
// const branches = ['c4.6', 'c4.7', 'c4.8', 'c4.9'];

// const branches = [
// 	'c1.0',
// 	'c1.1',
// 	'c1.2',
// 	'c1.3',
// 	'c1.4',
// 	'c1.5',
// 	'c1.6',
// 	'c1.7',
// 	'c1_challenge',
// 	'c1_solution',
// 	'c2.1',
// 	'c2.2',
// 	'c2.3',
// 	'c2.4',
// 	'c2.5',
// 	'c2.6',
// 	'c2_challenge',
// 	'c2_solution',
// 	'c3.1',
// 	'c3.2',
// 	'c3.3',
// 	'c3.4',
// 	'c3.5',
// 	'c3.6',
// 	'c3_challenge',
// 	'c3_solution',
// 	'c4.1',
// 	'c4.2',
// 	'c4.3',
// 	'c4.4',
// 	'c4.5',
// 	'c4.6',
// 	'c4.7',
// 	'c4.8',
// 	'c4.9',
// 	'c4_challenge',
// 	'c4_solution',
// 	'c5.1',
// 	'c5.2',
// 	'c5.3',
// 	'c5.4',
// 	'c5.5',
// 	'c5.6',
// 	'c5.7',
// 	'c5_challenge',
// 	'c5_solution',
// 	'c6.1',
// 	'c6.2',
// 	'c6.3',
// 	'c6.4',
// 	'c6.5',
// 	'c6.6',
// 	'c6.7',
// 	'c6.8',
// 	'c6_challenge',
// 	'c6_solution',
// 	'c7.1',
// 	'c7.2',
// 	'c7.3',
// 	'c7.4',
// 	'c7.5',
// 	'c7.6',
// 	'c7.7',
// 	'c7_challenge',
// 	'c7_solution'
// ];

const branches = [
	'_c1.1',
	'_c1.2',
	'_c1.3',
	'_c1.4',
	'_c1.5',
	'_c1.6'
]

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

	// DELETING
	lines.push(`git branch -D ${src}`)
	lines.push(`git push origin --delete ${src}`)

	// MERGING STUFF
	// lines.push(`### MERGING ${src} into ${dest} ###`)
	// lines.push(`echo MERGING ${src} into ${dest}`)
	// lines.push(`git checkout ${dest}`)
	// lines.push(`git pull origin ${dest}`)

	// backup
	// lines.push(`git checkout -b _${dest}`)
	// lines.push(`git push origin _${dest} -f`)

	// lines.push(`git checkout ${dest}`)

	// lines.push(`git merge ${src}`)
	// lines.push(`git push origin ${dest} -f`)
}

lines.push(`git status`);

// writeCommands(fileName, lines)

writeCommands(fileName, lines).then(() => {
	execProcess(`sh ${fileName}`, (err, response) => {
		if (!err) {
			console.log(response);
		} else {
			console.log(err);
		}
	});
});