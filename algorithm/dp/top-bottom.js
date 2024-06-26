// 피보나치 수열
const TARGET = 99;
const d = new Array(TARGET + 1).fill(0);

function fibo(x) {
  // 종료 조건 (초기항, 1혹은 2일 때 1을 반환)
  if (x === 1 || x === 2) return 1;

  // 이미 계산한 적 있는 문제라면 그대로 반환
  if (d[x] !== 0) return d[x];

  // 아직 계산하지 않은 문제라면 점화식에 따라 피보나치 결과 반환
  d[x] = fibo(x - 1) + fibo(x - 2);
  return d[x];
}

console.log(fibo(TARGET));
