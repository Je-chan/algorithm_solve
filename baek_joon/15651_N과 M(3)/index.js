const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);

const selected = [];

let answer = "";

const dfs = (count) => {
  if (count === M) {
    answer += selected.join(" ") + "\n";
    selected.pop();
    return;
  }

  for (let i = 1; i <= N; i++) {
    selected.push(i);

    dfs(count + 1);
  }

  selected.pop();
};

dfs(0);

console.log(answer);
