function solution(maps) {
  const n = maps[0].length;
  const m = maps.length;

  let answer = Number.MAX_SAFE_INTEGER;
  const visited = [];

  for (let i = 0; i < m; i++) {
    visited.push(maps[i].map((el) => !el));
  }

  const dfs = (x, y, count) => {
    if (x === n - 1 && y === m - 1) {
      answer = Math.min(answer, count);
      return;
    }

    if (x < 0 || y < 0 || x >= n || y >= m || visited[y][x]) {
      return;
    }

    visited[y][x] = true;

    dfs(x + 1, y, count + 1);
    dfs(x - 1, y, count + 1);
    dfs(x, y + 1, count + 1);
    dfs(x, y - 1, count + 1);

    visited[y][x] = false;
  };

  dfs(0, 0, 1);

  return answer === Number.MAX_SAFE_INTEGER ? -1 : answer;
}
