const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

let groups = input[0].split("-");
let answer = 0;

for (let i = 0; i < groups.length; i++) {
  const cur = groups[i]
    .split("+")
    .map(Number)
    .reduce((a, b) => a + b);

  if (i === 0) answer += cur;
  else answer -= cur;
}

console.log(answer);
