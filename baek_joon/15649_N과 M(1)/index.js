const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const result = [];

const range = new Array(N).fill(undefined).map((_, idx) => idx + 1);

const isPossibleNumber = (arr, number) => {
  return !arr.includes(number);
};

const dfs = (arr) => {
  if (arr.length === M) result.push(arr.join(" "));
  else {
    for (const num of range) {
      if (!isPossibleNumber(arr, num)) {
        continue;
      }

      const newArr = [...arr, num];
      dfs(newArr);
    }
  }
};

dfs([]);

result.forEach((el) => console.log(el));
