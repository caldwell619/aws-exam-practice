#!/bin/sh
source .env

aws dynamodb create-table \
  --table-name $TABLE_NAME \
  --attribute-definitions \
      AttributeName=User,AttributeType=S \
      AttributeName=BusinessDescription,AttributeType=S \
      AttributeName=BusinessEvent,AttributeType=S \
      AttributeName=EventDescription,AttributeType=S \
      AttributeName=PetCheckoutDate,AttributeType=S \
  --endpoint-url http://localhost:8000 \
  --key-schema AttributeName=User,KeyType=HASH AttributeName=BusinessDescription,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --global-secondary-indexes IndexName=BusinessEvents,KeySchema=["{AttributeName=BusinessEvent,KeyType=HASH}","{AttributeName=EventDescription,KeyType=RANGE}"],Projection="{ProjectionType=ALL}",ProvisionedThroughput="{ReadCapacityUnits=5,WriteCapacityUnits=5}" \
  --local-secondary-indexes IndexName=CheckOutDate,KeySchema=["{AttributeName=User,KeyType=HASH}","{AttributeName=PetCheckoutDate,KeyType=RANGE}"],Projection="{ProjectionType=ALL}"
