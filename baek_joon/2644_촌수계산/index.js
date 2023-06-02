/** @format */

const fs = require('fs');
const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');
let idx = 0;

function dfs(v) {
  visited[v] = true;
  for (let i = 0; i < graph[v].length; i++) {
    if (!visited[graph[v][i]]) {
      res[graph[v][i]] = res[v] + 1;
      dfs(graph[v][i]);
    }
  }
}

const n = parseInt(input[idx++]);
const [A, B] = input[idx++].split(' ').map(Number);
const m = parseInt(input[idx++]);

const graph = Array.from(Array(n + 1), () => []);
const visited = Array(n + 1).fill(false);
const res = Array(n + 1).fill(0);

for (let i = 0; i < m; i++) {
  const [a, b] = input[idx++].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

dfs(A);

if (res[B] > 0) {
  console.log(res[B]);
} else {
  console.log(-1);
}
