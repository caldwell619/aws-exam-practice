#!/bin/sh

source .env.local

aws dynamodb scan \
 --table-name $TABLE_NAME \
 --endpoint-url http://localhost:8000