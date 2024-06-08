const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const selected = [];

let answer = "";

const dfs = (beforeIdx) => {
  if (selected.length === M) {
    answer += selected.join(" ") + "\n";
    return;
  }

  for (let i = beforeIdx; i <= N; i++) {
    selected.push(i);
    dfs(i);
    selected.pop();
  }
};

dfs(1);

console.log(answer);
