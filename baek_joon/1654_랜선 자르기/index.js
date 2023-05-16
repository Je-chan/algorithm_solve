/** @format */

const fs = require('fs');
const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');
let [K, N] = input[0].split(' ').map(Number);
let line = input.slice(1).map(Number);

let start = 1;
let end = Math.max(...line);

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let cnt = line.reduce((sum, x) => sum + Math.floor(x / mid), 0);

  if (cnt >= N) {
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(end);
