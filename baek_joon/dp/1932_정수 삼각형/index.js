const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const triangle = input.slice(1).map(line => line.split(" ").map(Number));

const dp = Array.from({ length: N }, (_, i) => new Array(i + 1).fill(0));

if(N === 1) {
	console.log(triangle[0][0]);
	return;
}

if(N === 2) {
	console.log(Math.max(triangle[0][0] + triangle[1][0], triangle[0][0] + triangle[1][1]));
	return;
}

dp[0][0] = triangle[0][0];
dp[1][0] = dp[0][0] + triangle[1][0];
dp[1][1] = dp[0][0] + triangle[1][1];

/**
 * 0 > 0
 * 1 > 0, 1
 * 2 > 1, 2
 * N-1 > N-2
 */

for(let i = 2; i < N; i++) {
	for(let j = 0; j <= i; j++) {
		if(j === 0) {
			dp[i][0] = dp[i - 1][0] + triangle[i][0]
		} else if(j === i) {
			dp[i][j] = dp[i - 1][j - 1] + triangle[i][j]
		} else {
			dp[i][j] = Math.max(dp[i-1][j-1], dp[i-1][j]) + triangle[i][j]
		}
	}
}

console.log(dp[N - 1].reduce((a, b) => Math.max(a, b), 0));