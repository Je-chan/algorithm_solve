const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

console.log(
  input
    .slice(1)
    .map((el) => {
      const [age, name] = el.split(' ');
      return [Number(age), name];
    })
    .sort((before, after) => {
      return before[0] - after[0];
    })
    .reduce((acc, cur) => {
      return acc + cur[0] + ' ' + cur[1] + '\n';
    }, '')
);
