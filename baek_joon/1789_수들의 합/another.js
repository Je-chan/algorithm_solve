const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

let N = Number(input[0]);
let num = 1;
let count = 0;

while (N > 0 && N >= num) {
  N = N - num;
  num++;
  count++;
}

console.log(count);
