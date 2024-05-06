// 피보나치 수열(상향식)

const TARGET = 99;
const d = new Array(TARGET + 1).fill(0);

// 초기항 저장
d[1] = 1;
d[2] = 1;

for (let i = 3; i < TARGET; i++) {
  d[i] = d[i - 1] + d[i - 2];
}
