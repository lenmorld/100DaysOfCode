var Git = require("nodegit");

Git.Repository.open("git_try")
	.then(function (repo) {
		// return repo.getMasterCommit();
		return repo.getBranch("c1");
	})
	.then(function (branch) {
		// return repo.getMasterCommit();
		return branch.getBranch("c1");
	})
	.then(function (commit) {
		console.log(commit.message());
	});

// Git.Clone("https://github.com/lenmorld/git_try.git").then(function (repo) {
// 	// Work with the repository object here.

// 	var getMostRecentCommit = function (repository) {
// 		return repository.getBranchCommit("c1");
// 	};

// 	var getCommitMessage = function (commit) {
// 		return commit.message();
// 	};


// 	// Git.Repository.open("git_try")
// 	repo.open("git_try")
// 		.then(getMostRecentCommit)
// 		.then(getCommitMessage)
// 		.then(function (message) {
// 			console.log(message);
// 		});
// });