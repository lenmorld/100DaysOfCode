#! /usr/bin/bash
pwd
cd ../node_workshop/
pwd
# git --version
git checkout c4.3
# git merge c4.2 --no-commit
git merge c4.2
# git merge --abort
git push origin c4.3
git status
