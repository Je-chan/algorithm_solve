/** @format */

const fs = require('fs');

let input = fs.readFileSync('./dev/stdin').toString().split('\n');
let idx = 0;

function findVegetable(i, j, M, N, ground) {
  for (const [x, y] of [
    [i - 1, j],
    [i, j - 1],
    [i + 1, j],
    [i, j + 1],
  ]) {
    if (0 <= x && x < M && 0 <= y && y < N && ground[x][y] === 1) {
      ground[x][y] = 0;
      findVegetable(x, y, M, N, ground);
    }
  }
}

// input
const T = Number(input[idx++]);

for (let temp = 0; temp < T; temp++) {
  let wormCount = 0;
  const [M, N, K] = input[idx++].split(' ').map(Number);
  const ground = Array.from(Array(M), () => new Array(N).fill(0));

  for (let row = 0; row < K; row++) {
    const [x, y] = input[idx++].split(' ').map(Number);
    ground[x][y] = 1;
  }

  // main
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (ground[i][j] === 1) {
        wormCount += 1;
        ground[i][j] = 0;
        findVegetable(i, j, M, N, ground);
      }
    }
  }

  console.log(wormCount);
}
