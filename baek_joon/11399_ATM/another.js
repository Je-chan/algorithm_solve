const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

console.log(
  input[1]
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b)
    .reduce((acc, cur, idx, origin) => {
      return acc + origin.slice(0, idx).reduce((a, b) => a + b, 0) + cur;
    }, 0),
);
