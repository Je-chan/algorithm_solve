/** @format */

const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');
const [n, m] = input.shift().split(' ').map(Number);

const graph = Array.from(Array(n + 1), () => []);

for (let i = 0; i < m; i++) {
  const [a, b] = input[i].split(' ').map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

function bfs(start) {
  const visited = new Array(n + 1).fill(0);
  const queue = [[start, 0]];
  visited[start] = 1;
  let sum = 0;

  while (queue.length) {
    const [node, count] = queue.shift();
    sum += count;

    for (let i = 0; i < graph[node].length; i++) {
      const nextNode = graph[node][i];
      if (!visited[nextNode]) {
        visited[nextNode] = 1;
        queue.push([nextNode, count + 1]);
      }
    }
  }

  return sum;
}

const result = [];

for (let i = 1; i <= n; i++) {
  result.push(bfs(i));
}

console.log(result.indexOf(Math.min(...result)) + 1);
