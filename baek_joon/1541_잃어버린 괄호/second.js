const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

console.log(
  input[0]
    .split('-')
    .map((el) =>
      el
        .split('+')
        .map(Number)
        .reduce((acc, cur) => acc + cur)
    )
    .reduce((acc, cur) => acc - cur)
);
