#!/bin/sh
source .env.local

printf "\nBuilding latest template.."
printf "\n\n"
sam build \
  -b dist/ \
  -t template.yml \
	--use-container

if [ $? == 0 ]
then

printf "\n\nStarting API"
printf "\n\n"
sam local start-api \
  -p 5000 \
  -t dist/template.yaml 

else
  printf "\n\n"
  printf "Build failed, exiting."
  printf "\n\n"
fi