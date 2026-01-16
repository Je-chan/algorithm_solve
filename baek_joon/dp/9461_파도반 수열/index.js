const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const testCases = input.slice(1).map(Number);

/**
 * (1) 1
 * (2) 1
 * (3) 1
 * (4) 2 = 1 + 1
 * (5) 2 = 1 + 1
 * (6) 3 = 2 + 1  // (4) + (3)
 * (7) 4 = 2 + 2 // (5) + (4)
 * (8) 5 = 3 + 2 // (6) + (5)
 * (9) 7 = 4 + 3 // (7) + (6)
 * (10) 9 = 5 + 4 // (8) + 7)
 * (11) 12 = 7 + 5 // (9) + (8)
 * ...
 * N // (N-2) + N(N-3)
 */

for(const T of testCases) {
	if(T < 4) {
		console.log(1)
		continue;
	}

	const dp = new Array(T + 1).fill(0);
	dp[1] = 1
	dp[2] = 1
	dp[3] = 1

	for(let i = 4; i <= T; i++) {
		dp[i] = dp[i - 2] + dp[i - 3]
	}

	console.log(dp[T])
}