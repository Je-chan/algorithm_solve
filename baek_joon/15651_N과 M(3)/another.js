const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

let [n, m] = input[0].split(" ").map(Number);

let arr = [];
for (let i = 1; i <= n; i++) arr.push(i);

let selected = [];

let answer = "";

function dfs(arr, depth) {
  if (depth === m) {
    // 모든 중복 순열을 확인하는 부분
    let result = []; // 중복 순열 결과 저장 테이블
    for (let i of selected) result.push(arr[i]);
    for (let x of result) answer += x + " "; // 계산된 중복 순열을 실질적으로 처리하는 부분
    answer += "\n";
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    selected.push(i);
    dfs(arr, depth + 1);
    selected.pop();
  }
}

dfs(arr, 0);
console.log(answer);
