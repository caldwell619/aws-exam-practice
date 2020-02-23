#!/bin/sh

# Full service deploymnet script
Red="\033[0;31m"       # Red
Green="\033[0;32m"     # Green
BICyan="\033[1;96m"    # Bold Cyan

# Reset
Color_Off="\033[0m"    # Text Reset

# sh scripts/run-tests.sh
sh scripts/upload-swagger.sh
sh scripts/sam-build.sh
sh scripts/just-deploy.sh
