#!/bin/sh

aws cloudformation validate-template \
  --template-body file://template.yml