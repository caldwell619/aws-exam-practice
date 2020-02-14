#!/bin/sh

source .env.local

printf "\n\nUploading Swagger file to S3.."
printf "\n\n"
aws s3 cp \
  src/swagger/api.json \
  s3://$S3_BUCKET/swagger-api-template.json
