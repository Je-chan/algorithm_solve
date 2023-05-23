/** @format */

const fs = require('fs');

const input = fs
  .readFileSync('../dev/stdin')
  .toString()
  .split('\n')
  .map((line) => line.trim());
const n = Number(input[0]);
const li = input.slice(1);

let cnt = 0;
for (let i = 0; i < n - 1; i++) {
  for (let j = i + 1; j < n; j++) {
    const word1 = li[i];
    const word2 = li[j];

    let flag = true;
    const check1 = new Array(26).fill(0);
    const check2 = new Array(26).fill(0);
    for (let k = 0; k < word1.length; k++) {
      const idx1 = word1.charCodeAt(k) - 'a'.charCodeAt(0);
      const idx2 = word2.charCodeAt(k) - 'a'.charCodeAt(0);

      if (check1[idx1] === 0 && check2[idx2] === 0) {
        check1[idx1] = word2[k];
        check2[idx2] = word1[k];
      } else if (check1[idx1] !== word2[k]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      cnt++;
    }
  }
}
console.log(cnt);
