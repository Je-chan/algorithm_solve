const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");
const N = Number(input[0])

let arr = new Array(N ).fill(null).map((_, i) => i + 1)
let visited = new Array(N).fill(false)
let selected = []

let answer = ''

const dfs = (arr, depth) => {
  if(depth === N) {
    let result = []
    for (let i of selected) result.push(arr[i])
    for (let x of result) answer += x + " "
    answer += "\n"
    return;
  }

  for(let i = 0 ; i < arr.length ; i++) {
    if(visited[i]) continue;
    selected.push(i)
    visited[i] = true;
    dfs(arr, depth + 1)
    selected.pop()
    visited[i] = false
  }
}

dfs(arr, 0)
console.log(answer)