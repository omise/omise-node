#!/bin/sh
git stash -q --keep-index

#check code styling
npm run jscs
RESULT=$?
git stash pop -q
if [ $RESULT -ne 0 ];
then
    echo "Inconsistent style, commit has failed."
    exit 1
fi
#run test
npm test
RESULT=$?
git stash pop -q
if [ $RESULT -ne 0 ];
then
  echo "Test failed, commit has failed."
  exit 1
fi
exit 0
