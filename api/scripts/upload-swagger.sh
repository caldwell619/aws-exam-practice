#!/bin/sh

# Bringing in the proper variable

source .env

printf "\n\nUploading Swagger file to S3.."
printf "\n\n"
aws s3 cp \
  src/swagger/swagger-template.json \
  s3://$S3_BUCKET/swagger-api-template.json