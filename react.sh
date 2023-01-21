#!/usr/bin/env bash

npm list -g | grep pnpm || npm install -g pnpm

CI=true pnpm install

if [ "$1" == "start" ]
then
    pnpm vite --port 3000 --open --force
elif [ "$1" == "build" ]
then
    rm -rf build
    pnpm tsc
    pnpm vite build
fi
