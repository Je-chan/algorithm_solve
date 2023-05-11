/** @format */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const [A_price, B_price] = input[1].split(' ').map(Number);
const C = Number(input[2]);
const D = input.slice(3).map(Number);
D.sort((a, b) => b - a);

let answer = 0;

for (let i = 0; i <= N; i++) {
  let balance = C + D.slice(0, i).reduce((acc, cur) => acc + cur, 0);
  let price = A_price + B_price * i;
  answer = Math.max(answer, Math.floor(balance / price));
}

console.log(answer);
