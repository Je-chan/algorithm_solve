function solution(n, computers) {
  const visited = new Array(n).fill(false);

  const dfs = (index) => {
    visited[index] = true;
    for (let i = 0; i < n; i++) {
      if (computers[index][i] === 1 && !visited[i]) {
        dfs(i);
      }
    }
  };

  let answer = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i);
      answer++;
    }
  }

  return answer;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ]),
); // 2

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 1],
    [0, 1, 1],
  ]),
); // 1