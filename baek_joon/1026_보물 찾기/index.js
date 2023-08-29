const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [sortedA, sortedB] = input.slice(1).map((arr, idx) =>
  arr
    .split(" ")
    .map(Number)
    .sort((before, after) => (idx === 0 ? after - before : before - after))
);

console.log(
  sortedB.reduce((acc, cur, idx) => {
    return acc + cur * sortedA[idx];
  }, 0)
);
