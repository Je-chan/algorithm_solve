const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

let [n, m] = input[0].split(" ").map(Number);
let graph = []
for(let i = 0; i <= n; i++) {graph[i] = []}
for(let i = 1; i < n; i++) {
  let [x, y, cost] = input[i].split(" ").map(Number)
  graph[x].push([y, cost])
  graph[y].push([x, cost])
}



let result = ''
for (let i = 0; i < m; i++) {
  let [x, y] = input[n + i].split( " ").map(Number)

  let visited = new Array(n + 1).fill(false)
  let distance = new Array(n + 1).fill(-1)

  dfs(x, 0)

  function dfs (x, dist) {
    if(visited[x]) return;

    visited[x] = true;
    distance[x] = dist

    for(let [y, cost] of graph[x]) {
      dfs(y, dist + cost)
    }
  }

  result += distance[y] + "\n"
}

console.log(result)