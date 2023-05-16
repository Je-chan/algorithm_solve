/** @format */

const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

let [n, m] = input[0].split(' ').map(Number);
const questObj = {};

for (let i = 1; i <= n; i++) {
  const a = input[i].trim();
  questObj[i] = a;
  questObj[a] = i;
}

for (let i = n + 1; i <= n + m; i++) {
  const quest = input[i].trim();
  if (!Number.isNaN(quest)) {
    console.log(questObj[parseInt(quest)]);
  } else {
    console.log(questObj[quest]);
  }
}
