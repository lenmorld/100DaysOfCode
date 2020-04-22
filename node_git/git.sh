cd ../../node_workshop_client/node_workshop
pwd
git status
### MERGING c4.6 into c4.7 ###
echo MERGING c4.6 into c4.7
git checkout c4.7
git merge c4.6
git push origin c4.7
### MERGING c4.7 into c4.8 ###
echo MERGING c4.7 into c4.8
git checkout c4.8
git merge c4.7
git push origin c4.8
### MERGING c4.8 into c4.9 ###
echo MERGING c4.8 into c4.9
git checkout c4.9
git merge c4.8
git push origin c4.9
git status
