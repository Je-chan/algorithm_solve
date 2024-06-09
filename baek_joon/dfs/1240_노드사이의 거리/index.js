const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number)
const nodeInfoMap = new Map(
    Array.from(new Array(N + 1),
        (_, idx) => [idx, new Array(N + 1).fill(0)])
)


input.slice(1, N).forEach(nodeInfo => {
  const [a, b, distance] = nodeInfo.split(" ").map(Number)
  const newANodeInfo = nodeInfoMap.get(a)
  newANodeInfo[b] = distance
  const newBNodeInfo = nodeInfoMap.get(b)
  newBNodeInfo[a] = distance
})


let visited = new Array(N + 1).fill(false)
let possible = Number.MAX_SAFE_INTEGER;
const dfs = (currentNode, target, totalDistance) => {
  if(currentNode === target) {
    possible = Math.min(totalDistance, possible)
    return
  }

  for(let i = 1; i <= N; i++) {
    if(nodeInfoMap.get(currentNode)[i] === 0 || visited[i]) continue

    visited[i] = true
    dfs(i, target, totalDistance + nodeInfoMap.get(currentNode)[i])
    visited[i] = false
  }
}

let result = ''

input.slice(N).forEach((testCase, idx) => {
  const [a, b] = testCase.split(" ").map(Number)
  visited[a] = true
  dfs(a, b, 0)
  result += possible + "\n"

  visited = new Array(N + 1).fill(false)
  possible = Number.MAX_SAFE_INTEGER;
})




console.log(result)

