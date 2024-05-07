const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

// 매트릭스 구조의 그래프의 경우, 인접 노드 방식이 아닌 상-하-좌-우 이동으로 봐야 한다
const dfs = (matrix, n, m, x, y) => {
  // 주어진 범위를 벗어나면 종료
  if (x <= -1 || x >= n || y <= -1 || y >= m) {
    return false;
  }

  // 1은 현재 배추가 있다는 것을 의미
  if (matrix[x][y] === 1) {
    // 방문했으면 -1 로 표기
    matrix[x][y] = -1;

    // 상, 하, 좌, 우 이동을 모두 할 것
    // >> 이 로직을 통해서 현재 위치한 노드와 연결된 모든 노드들은 다 -1 로 바뀌게 됨
    dfs(matrix, n, m, x - 1, y);
    dfs(matrix, n, m, x, y - 1);
    dfs(matrix, n, m, x + 1, y);
    dfs(matrix, n, m, x, y + 1);
    return true;
  }

  return false;
};

let testCaseList = Number(input[0]);
let line = 1;

while (testCaseList--) {
  // 가로 길이 M, 세로 길이 N, 배추가 심어진 위치 개수 K
  let [m, n, k] = input[line].split(" ").map(Number);
  const matrix = Array.from(Array(m), () =>
    Array(n)
      .fill(null)
      .map(() => 0),
  );

  for (let i = 1; i <= k; i++) {
    let [y, x] = input[line + i].split(" ").map(Number);
    // 배추 심기
    matrix[x][y] = 1;
  }

  let answer = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (dfs(matrix, n, m, i, j)) answer++; // 현재 위치에서 dfs 수행
    }
  }

  line += k + 1; // 다음 케이스로 이동
  console.log(answer);
}
