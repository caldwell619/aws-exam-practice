#!/bin/sh

Red="\033[0;31m"       # Red
Green="\033[0;32m"     # Green
BICyan="\033[1;96m"    # Bold Cyan

# Reset
Color_Off="\033[0m"    # Text Reset

printf "\n\n$BICyan$( echo Uploading Swagger file to S3. )$Color_Off"
printf "\n\n"
aws s3 cp \
  src/swagger/swagger.json \
  s3://$S3_BUCKET/swagger-api-template.json

if [ $? == 0 ]
then
  printf "\n\n$Green$( echo Successful upload.. )$Color_Off"
  printf "\n\n"
else
  printf "\n\n$Red$( echo Unsuccessful upload.. )$Color_Off"
  printf "\n\n"
  exit 1
fi