/** @format */

const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');
const n = parseInt(input[0]);

for (let i = 1; i <= n; i++) {
  const data = input[i].trim().split('').map(Number);
  const length = data.length;
  let idx = 0;

  for (let j = length - 1; j > 0; j--) {
    if (data[j] > data[j - 1]) {
      if (j === length - 1) {
        idx = length - 2;
      } else {
        idx = j - 1;
      }
      break;
    }
  }

  const a = data.slice(0, idx);
  const b = data.slice(idx);

  if (a.length === 0 || b.length === 0) {
    console.log('BIGGEST');
  } else {
    b.sort((a, b) => a - b);
    for (let j = 0; j < b.length; j++) {
      if (b[j] > data[idx]) {
        a.push(b.splice(j, 1)[0]);
        a.push(...b);
        break;
      }
    }
    console.log(a.join(''));
  }
}
