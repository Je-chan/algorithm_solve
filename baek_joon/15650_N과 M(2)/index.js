const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const visited = new Array(N + 1).fill(false);
const selected = [];

let answer = "";

const dfs = (beforeIdx) => {
  if (selected.length === M) {
    answer += selected.join(" ") + "\n";
    selected.pop();
    visited[beforeIdx] = false;
    return;
  }

  for (let i = beforeIdx + 1; i <= N; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    selected.push(i);

    dfs(i);

    visited[i] = false;
  }

  selected.pop();
};

dfs(0);

console.log(answer);
