#!/bin/sh

BICyan="\033[1;96m"    # Bold Cyan

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