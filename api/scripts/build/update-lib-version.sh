#!/bin/sh

node scripts/build/recursiveInstallOfHelper.js

git add **/package*

git commit -m 'version bump'