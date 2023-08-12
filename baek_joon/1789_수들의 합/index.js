const fs = require('fs');
const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const S = input[0];

let N = 1;
let sum = 1;

while (sum <= S) {
  N += 1;
  sum += N;
}

console.log(N - 1);
