const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");
let [A, B] = input[0].split(" ").map(Number);

// B 에서 A 로 이동한다고 생각해보자
// 현재의 B 값이 정해져 있으면 취할 수 있는 행동은 항상 정해져 있다
/**
 * (1) 값이 2로 나누어 떨어지는 경우 => 2로 나누는 연산만 가능하다
 * (2) 일의 자릿수가 1인 경우 => 10으로 나누는 연산만 사용이 가능하다 (2로 나눌 수 없기 때문)
 * (3) 위 경우가 모두 해당하지 않은 경우 => 더 이상의 이동이 불가능하다.

 * 즉, 매 상황에서 이동 경로는 단 하나만 존재하므로 그리디 알고리즘에 해당한다.
 */

let flag = false;
let result = 1;

while (A <= B) {
  if (A === B) {
    flag = true;
    break;
  }

  if (B % 2 === 0) B = Math.floor(B / 2);
  else if (B % 10 === 1) B = Math.floor(B / 10);
  else break;

  result++;
}

console.log(flag ? result : -1);
