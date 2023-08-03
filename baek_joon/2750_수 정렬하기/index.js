const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

console.log(
  input
    .slice(1)
    .sort((before, after) => before - after)
    .reduce((acc, cur) => acc + cur + '\n', '')
);
