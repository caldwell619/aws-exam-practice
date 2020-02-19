#!/bin/sh

# Full service deploymnet script
Red="\033[0;31m"       # Red
Green="\033[0;32m"     # Green
BICyan="\033[1;96m"    # Bold Cyan

# Reset
Color_Off="\033[0m"    # Text Reset

printf "\n\n$BICyan$( echo Running unit tests.. )$Color_Off"
npm run test:unit

if [ $? != 0 ]
then
  exit 1
fi

printf "\n\n$BICyan$( echo Running unit tests.. )$Color_Off"
npm run test:integration

if [ $? != 0 ]
then
  exit 1
fi


sh scripts/upload-swagger.sh
sh scripts/sam-build.sh
sh scripts/just-deploy.sh
