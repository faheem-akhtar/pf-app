#!/usr/bin/env node

const fs = require('fs');

const envFilePath = '.env';

let envContent = fs.readFileSync(envFilePath, 'utf8');

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

const names = shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));

envContent.match(/NEXT_PUBLIC_PROPERTY_SERP_OBFUSCATED_FIELD.+=(.+)/g).forEach((line) => {
  envContent = envContent.replace(line, [line.split('=')[0], names.pop()].join('='));
});

fs.writeFileSync(envFilePath, envContent, 'utf8');
