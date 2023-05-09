/** @format */

const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');
const [a, b] = input[0].trim().split(' ').map(Number);
const [n, m] = input[1].trim().split(' ').map(Number);

const board = [...Array(n + 1)].map(() => []);
for (let i = 0; i < m; i++) {
  const [x, y] = input[2 + i].trim().split(' ').map(Number);
  board[x].push(y);
  board[y].push(x);
}

const MAX = 1e9;
let minChangeCnt = MAX;
const visited = new Array(n + 1).fill(false);
visited[a] = true;
const q = [[a, 0]];
while (q.length) {
  const [cur, dist] = q.shift();
  if (cur === b) {
    minChangeCnt = Math.min(minChangeCnt, dist);
  }
  for (const next of board[cur]) {
    if (!visited[next]) {
      visited[next] = true;
      q.push([next, dist + 1]);
    }
  }
}

if (minChangeCnt === MAX) {
  minChangeCnt = -1;
}
console.log(minChangeCnt);
