const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

let N = Number(input[0]);

let answer = Number.MAX_SAFE_INTEGER;
const dfs = (currentWeight, count) => {
  if (currentWeight === 0) {
    answer = Math.min(count, answer);
    return;
  }

  if (currentWeight < 0) {
    return;
  }

  if (answer !== Number.MAX_SAFE_INTEGER) return;

  dfs(currentWeight - 5, count + 1);
  dfs(currentWeight - 3, count + 1);
};

dfs(N, 0);

console.log(answer === Number.MAX_SAFE_INTEGER ? -1 : answer);
