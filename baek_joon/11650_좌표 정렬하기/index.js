const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

console.log(
  input
    .slice(1)
    .map((el) => el.split(' ').map(Number))
    .sort((before, after) => before[0] - after[0] || before[1] - after[1])
    .map((el) => el.join(' '))
    .reduce((acc, cur) => acc + cur + '\n', '')
);
