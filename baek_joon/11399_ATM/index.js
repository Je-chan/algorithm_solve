const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

console.log(
  input[1]
    .split(' ')
    .map(Number)
    .sort((before, after) => before - after)
    .map((time, idx, origin) => {
      return (
        time +
        origin.reduce(
          (acc, cur, i) => (i >= idx || idx === 0 ? acc : acc + cur),
          0
        )
      );
    })
    .reduce((acc, cur) => acc + cur)
);
