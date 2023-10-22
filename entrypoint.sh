#!/bin/bash

./node_modules/.bin/pm2 start server.mjs
./node_modules/.bin/pm2 logs