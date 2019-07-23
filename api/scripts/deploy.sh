#!/bin/sh

source .env

printf "\nPackaging.."
printf "\n"
aws cloudformation package \
  --s3-bucket $S3_BUCKET \
  --output-template-file ./dist/package.yml \
  --template-file template.yml

if [ $? == 0 ]
then 
  printf "\nDeploying.. \n"
  printf "\n"
  aws cloudformation deploy \
    --template-file ./dist/package.yml \
    --stack-name $STACK_NAME \
    --capabilities \
    CAPABILITY_AUTO_EXPAND \
    CAPABILITY_NAMED_IAM

  printf "\n"
else 
  printf "\n\nPackage unsuccessful. Not deploying"
  printf "\n\n"
  exit 1
fi

exit 0
