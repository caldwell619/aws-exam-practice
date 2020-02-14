#!/bin/sh

Red="\033[0;31m"       # Red
BICyan="\033[1;96m"    # Bold Cyan
Color_Off="\033[0m"    # Text Reset

printf "\n\n$BICyan$( echo Running linting service.. )$Color_Off"
printf "\n\n"

npm run lint

if [ $? != 0 ]
then
  printf "\n\n$Red$( echo Linting failed. )$Color_Off"
  exit 1
fi

printf "\n\n$Green$( echo Linting successful. Moving on. )$Color_Off"


printf "\n\n$BICyan$( echo Building the latest artifact.. )$Color_Off"
printf "\n\n"
sam build \
  -t email-service.yml

if [ $? == 0 ]
then
  printf "\n\n$BICyan$( echo Packaging built artifact.. )$Color_Off"
  printf "\n\n"
  sam package \
    --template-file template.yml \
    --s3-bucket $S3_BUCKET \
    --output-template-file .email-service.yaml
else
  printf "\n\n$Red$( echo Build unsucessful.. )$Color_Off"
  exit 1
fi