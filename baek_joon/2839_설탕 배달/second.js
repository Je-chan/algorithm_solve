const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

/**
 * 5로 가장 많이 뺐을 때가 봉지를 가장 많이 사용하는 경우
 * 현재의 문제를 수식으로 표현하면
 *
 * 3A + 5B = N
 *
 * 여기서 가장 큰 B 를 찾는 것은(5로 가장 많이 빼는 것은)
 * = 가장 작은 A 를 찾는다는 것으로 해석이 가능
 *
 * 반복적으로 3을 빼면서 5로 나누어 떨어질 때를 찾으면 된다.
 */

let n = Number(input[0]);
let count = 0;
let flag = false;

while (n >= 0) {
  if (n === 0 || n % 5 === 0) {
    count += Math.floor(n / 5);
    console.log(count);
    flag = true;
    break;
  }

  n -= 3;
  count += 1;
}

if (!flag) {
  console.log(-1);
}
