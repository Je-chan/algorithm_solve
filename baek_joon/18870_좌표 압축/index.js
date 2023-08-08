const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const N = input[0];

const numberObj = [...new Set(input[1].split(' '))]
  .sort((before, after) => before - after)
  .reduce((acc, cur, idx) => {
    return Object.assign(acc, { [cur]: idx });
  }, {});

console.log(
  input[1]
    .split(' ')
    .map((number) => numberObj[String(number)])
    .join(' ')
);
