const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const targetIdx = input[0].split(' ')[1];

console.log(
  input[1]
    .split(' ')
    .map((data) => Number(data))
    .sort((before, after) => before - after)[targetIdx - 1]
);
