/** @format */

const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const line = () => input[index++].trim();

let index = 0;
const [N, M] = line().split(' ').map(Number);

const answer = [];
let heard = [];
let seen = [];

for (let i = 0; i < N; i++) {
  heard.push(line());
}

for (let i = 0; i < M; i++) {
  seen.push(line());
}

heard = [...new Set(heard)];
seen = new Set(seen);

answer = heard.filter((name) => seen.has(name));

answer.sort();

console.log(answer.length);

for (let name of answer) {
  console.log(name);
}
