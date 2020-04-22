echo "merging c2 into c3"
git checkout c3
git merge c2 --strategy-option theirs
git push origin c3
echo "merging c3 into c4"
git checkout c4
git merge c3 --strategy-option theirs
git push origin c4
