#!/bin/sh

source .env

aws cloudformation validate-template \
  --template-body file://template.yml