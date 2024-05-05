const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const n = Number(input[0]);
const budgetList = input[1].split(" ").map(Number);
const totalBudget = Number(input[2]);

let start = 1; // 이진 탐색을 위한 시작점
let end = budgetList.reduce((a, b) => Math.max(a, b));

let result = 0;

// 탐색 시작
while (start <= end) {
  // mid 가 사실상 상한액
  let mid = parseInt((start + end) / 2);
  let total = 0; // 배정된 에산 총액 계산

  // 각 지방에서 요청한 예산을 하나씩 확인
  for (const budget of budgetList) {
    // 중간 값으로 예산을 배정
    total += Math.min(mid, budget);
  }

  // 산정한 예산이 총 예산보다 적다면? 상한액을 챙기기 위해 증가
  if (total <= totalBudget) {
    result = mid;
    start = mid + 1;
  }

  // 산정한 예산이 산정 총 예산보다 크다면? 상한액을 감소
  else {
    end = mid - 1;
  }
}

console.log(result);
