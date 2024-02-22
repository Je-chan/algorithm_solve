function solution(triangle) {
  const depth = triangle.length;
  const dp = Array.from(Array(depth), () => Array(depth).fill(0));

  for (let i = 0; i < depth; i++) {
    dp[depth - 1][i] = triangle[depth - 1][i];
  }

  for (let i = depth - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[i][j] = Math.max(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j];
    }
  }

  return dp[0][0];
}

console.log(solution([[7], [3, 8], [8, 1, 0], [2, 7, 4, 4], [4, 5, 2, 6, 5]])); // 30