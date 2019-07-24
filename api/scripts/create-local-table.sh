#!/bin/sh
source .env

aws dynamodb create-table \
  --table-name $TABLE_NAME \
  --attribute-definitions \
      AttributeName=Identifier,AttributeType=S \
      AttributeName=Description,AttributeType=S \
  --endpoint-url http://localhost:8000 \
  --key-schema AttributeName=Identifier,KeyType=HASH AttributeName=Description,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
