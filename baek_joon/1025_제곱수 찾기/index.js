/** @format */

const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');
const [N, M] = input[0].split(' ').map(Number);
const board = input.slice(1);

let answer = -1;

function sqr(S) {
  S = parseInt(S);
  return parseInt(Math.sqrt(S)) ** 2 === S;
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    for (let row_d = -N; row_d < N; row_d++) {
      for (let col_d = -M; col_d < M; col_d++) {
        let S = '';
        let x = i;
        let y = j;
        if (row_d === 0 && col_d === 0) {
          continue;
        }
        while (0 <= x && x < N && 0 <= y && y < M) {
          S += board[x][y];
          if (sqr(S)) {
            answer = Math.max(answer, parseInt(S));
          }
          x += row_d;
          y += col_d;
        }
      }
    }
  }
}

console.log(answer);
