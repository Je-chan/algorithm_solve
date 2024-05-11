const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const arr = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let answer = 0;
let summary = 0;

for (let i = 0; i < n; i++) {
  summary += arr[i];
  answer += summary;
}

console.log(answer);
