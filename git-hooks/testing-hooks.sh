#!/bin/sh

git show | grep ui/

if [ $? == 0 ]
then
  echo "true"
else
  echo "false"
fi
