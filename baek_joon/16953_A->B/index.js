const fs = require('fs');
const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const [startNum, endNum] = input[0].split(' ').map(Number);

let currentNum = endNum;
let count = 1;

while (currentNum > startNum) {
  const currentStr = String(currentNum);
  if (currentStr[currentStr.length - 1] === '1') {
    currentNum = Number(currentStr.slice(0, currentStr.length - 1));
  } else if (currentNum % 2 === 0) {
    currentNum = currentNum / 2;
  } else {
    break;
  }

  count++;
}

if (currentNum === startNum) console.log(count);
else console.log(-1);
