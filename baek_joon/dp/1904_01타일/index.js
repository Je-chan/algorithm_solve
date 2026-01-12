const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

const dp = new Array(N + 1).fill(0);

dp[1] = 1
dp[2] = 2
dp[3] = 3


if(N < 4) {
	console.log(dp[N])
} else {
	for(let i = 4; i <= N; i++) {
		dp[i] = (dp[i - 1] + dp[i - 2]) % 15746
	}

	console.log(dp[N])
}



// (1) 1										| 1
// (2) 00, 11           		| (1) + 1 | 2
// (3) 001, 100, 111 				| (2) + 1 | 3
// (4) 0000, 0011, 1001, 1100, 1111	|  (3) + (2)  |
// (5)  00000, 00011, 00100, 10000, 00111, 10011, 11100, 11111	| (4) + (3) |
// => dp[n] = dp[n-1] + dp[n-2]
