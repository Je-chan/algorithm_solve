const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

console.log(
  input
    .slice(1)
    .sort(
      (before, after) =>
        before.length - after.length || before.localeCompare(after)
    )
    .filter((el, idx, origin) => idx === 0 || el !== origin[idx - 1])
    .reduce((acc, cur) => acc + cur + '\n', '')
);
