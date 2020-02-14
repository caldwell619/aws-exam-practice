#!/bin/sh

source .env.local

aws dynamodb create-table \
  --table-name $TABLE_NAME \
  --attribute-definitions \
      AttributeName=$TABLE_PARTITION_KEY,AttributeType=S \
      AttributeName=$TABLE_RANGE_KEY,AttributeType=S \
      AttributeName=$TABLE_GSI_1_PARTITION_KEY,AttributeType=S \
      AttributeName=$TABLE_GSI_1_RANGE_KEY,AttributeType=S \
  --endpoint-url http://localhost:8000 \
  --key-schema \
    AttributeName=$TABLE_PARTITION_KEY,KeyType=HASH \
    AttributeName=$TABLE_RANGE_KEY,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --global-secondary-indexes "IndexName=$TABLE_GSI_1_NAME,KeySchema=[{AttributeName=$TABLE_GSI_1_PARTITION_KEY,KeyType=HASH},{AttributeName=$TABLE_GSI_1_RANGE_KEY,KeyType=RANGE}],Projection={ProjectionType=ALL},ProvisionedThroughput={ReadCapacityUnits=5,WriteCapacityUnits=5}"
  