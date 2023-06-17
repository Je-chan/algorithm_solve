/** @format */

let input = require('fs')
  .readFileSync('../dev/stdin')
  .toString()
  .trim()
  .split('\n');
let n = Number(input[0]);
let sin = [];
let ss = [];

for (let i = 1; i <= n; i++) {
  let line = input[i].split(' ').map(Number);
  sin.push(line[0]);
  ss.push(line[1]);
}

let res = Number.MAX_SAFE_INTEGER;

function making_food(input_cnt, cnt, sin_sum, ss_sum) {
  if (cnt == n) {
    if (input_cnt != 0) {
      res = Math.min(res, Math.abs(sin_sum - ss_sum));
    }
    return;
  }
  making_food(input_cnt, cnt + 1, sin_sum, ss_sum);
  making_food(input_cnt + 1, cnt + 1, sin_sum * sin[cnt], ss_sum + ss[cnt]);
}

making_food(0, 0, 1, 0);
console.log(res);
