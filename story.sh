#!/usr/bin/env bash

npm list -g | grep pnpm || npm install -g pnpm

CI=true pnpm install

if [ "$1" == "start" ]
then
    pnpm start-storybook -p 6006
elif [ "$1" == "build" ]
then
    rm -rf stories
    pnpm build-storybook -o stories
fi
