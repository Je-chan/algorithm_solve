const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

console.log(
  input[0]
    .split('')
    .map(Number)
    .sort((before, after) => after - before)
    .join('')
);
