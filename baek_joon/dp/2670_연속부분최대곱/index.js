const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

/**
 * (1) i 번째 수를 선택하는 경우
 * > dp[i] = Math.max(arr[i], dp[i-1] * arr[i])
 * (2) i 번째 수를 선택하지 않는 경우
 * > dp[i] = d[i-1]
 *
 * 그런데 문제는 1을 넘겼을 때?
 * 이전 것의 곱 까지는 확인해야할 듯.
 *
 * > dp[i] = Math.max(arr[i], dp[i-1] * arr[i], arr[i] * arr[i-1]
 */

const N = Number(input[0]);
const arr = input.slice(1).map(Number);
const dp = new Array(N).fill(0);

if(N === 1) {
	console.log(arr[0]);
	return;
}

if(N === 2) {
	console.log(Math.max(arr[1], arr[0] * arr[1]));
	return;
}

dp[0] = arr[0];
dp[1] = Math.max(arr[1], arr[0] * arr[1])

for(let i = 2; i < N; i++) {
	dp[i] = Math.max(arr[i], dp[i - 1] * arr[i], arr[i] * arr[i - 1])
}

console.log(dp.reduce((a, b) => Math.max(a, b), 0).toFixed(3));



