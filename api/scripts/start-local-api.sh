#!/bin/sh
source .env

printf "\nBuilding latest template.."
printf "\n\n"
sam build \
  -b dist/ \
  -t template.yml \
	--use-container

printf "\n\nStarting API"
printf "\n\n"
sam local start-api \
  -p 5000 \
  -t dist/template.yaml 