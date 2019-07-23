#!/bin/sh

source .env

aws dynamodb scan \
 --table-name $TABLE_NAME \
 --endpoint-url http://localhost:8000