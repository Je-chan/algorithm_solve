/** @format */

const fs = require('fs');

const input = fs.readFileSync('./dev/stdin').toString().trim();

let result = Number.MAX_SAFE_INTEGER;

// 마이너스가 최솟값을 만들어낼 수 있는 지표이므로 마이너스를 기준으로 나눈다
const minus = input.split('-');

for (let i = 0; i < minus.length; i++) {
  let checkNum = 0;
  // + 기호로 한 번 나눈다
  const plus = minus[i].split('+');

  // + 로 더한 것을 괄호로 묶어서 뺄지, 아니면 그냥 + 기호와는 상관 없는 숫자로 뺄지
  for (let j = 0; j < plus.length; j++) {
    checkNum += parseInt(plus[j]);
  }

  if (result === Number.MAX_SAFE_INTEGER) {
    result = checkNum;
  } else {
    result -= checkNum;
  }
}
console.log(result);
