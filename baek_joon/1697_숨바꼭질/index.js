/** @format */

const fs = require('fs');
const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const check = new Array(100001).fill(0);
let N, K;

const bfs = (num) => {
  const queue = [];
  queue.push(num);
  check[num] = 1;

  while (queue.length) {
    const temp = queue.shift();

    for (let i = 0; i < 3; i++) {
      let next;

      if (i === 0) {
        next = temp + 1;
      } else if (i === 1) {
        next = temp - 1;
      } else {
        next = temp * 2;
      }

      if (next === K) {
        console.log(check[temp]);
        return;
      }

      if (next >= 0 && next < check.length && check[next] === 0) {
        queue.push(next);
        check[next] = check[temp] + 1;
      }
    }
  }
};

[N, K] = input[0].split(' ').map(Number);

if (N === K) {
  console.log(0);
} else {
  bfs(N);
}
