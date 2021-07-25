#!/bin/bash -f

./node_modules/.bin/esbuild scripts/download-resources/script.ts --bundle --outfile=scripts/download-resources/script.js --platform=node --target=node14

node scripts/download-resources/script.js
