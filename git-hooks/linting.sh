#!/bin/sh

function lintUI() {
  cd ui/
  npm run lint
}

function lintAPI() {
  cd api/
  npm run lint
}

git show | grep ui/

if [ $? == 0 ]
then
  lintUI
fi

git show | grep api/

if [ $? == 0 ]
then
  lintAPI
fi

