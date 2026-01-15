const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);

const dp = new Array(N).fill(0);
const wine = input.slice(1).map(Number)
console.log(wine)
console.log(dp)

dp[0] = wine[0]
dp[1] = wine[0] + wine[1]
dp[2] = Math.max(wine[0] + wine[1], wine[0] + wine[2], wine[1] + wine[2])

for(let i = 3; i < N; i++) {
	dp[i] = dp[i-1]
	dp[i] = Math.max(dp[i], wine[i] + dp[i-2])
	dp[i] = Math.max(dp[i], wine[i] + wine[i-1] + dp[i-3])
}

console.log(dp[N - 1])
// 연속으로 놓여있는 3잔을 모두 마실 수는 없다. = i-2, i-1, i 를 동시에 마실 수 없다.
// >> i-2 를 마신다면 i 를 마실 수 있다.
// >> i-1 를 마셨다면 i 를 마실 수 없다

/**
 * (1) i 번째에 있는 와인을 마시지 않는 경우
 * 		> 최적해 : dp[i - 1]
 * (2) i 번째에 있는 완인을 미시는 경우
 * 		(2-1) dp[i-2] > dp[i-1]
 * 		> 최적해 : wine[i] + dp[i-2]
 * 		(2-2) i-2 를 건너뛰어서 마시기
 * 		> 최적해 : wine[i] + wine[i-1] + dp[i-3]
 */