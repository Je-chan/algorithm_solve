const fs = require('fs');
const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const totalKg = input[0];
let answer;
for (let i = 0; i <= Math.ceil(totalKg / 5); i++) {
  const minusBy5 = 5 * i;
  const restMinusBy5 = totalKg - minusBy5;

  if (restMinusBy5 === 0) {
    answer = i;
    break;
  }

  for (let j = 0; j <= Math.ceil(restMinusBy5 / 3); j++) {
    const dividedBy3 = 3 * j;
    const restDividedBy3 = restMinusBy5 % dividedBy3;

    if (restDividedBy3 === 0) {
      answer = i + j;
    }
  }
}
console.log(answer ?? -1);
