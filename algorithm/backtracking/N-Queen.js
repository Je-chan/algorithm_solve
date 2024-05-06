const N = 8;

const queens = [];

function isPossiblePosition(x, y) {
  for (let [x2, y2] of queens) {
    // (1) 행이나 열이 같은 경우 => 퀸에게 잡히므로 안 됨
    if (x2 === x || y2 === y) return false;

    // (2) 대각선에 위치한 경우 => 퀸에게 잡히므로 안 됨
    if (Math.abs(x - x2) === Math.abs(y - y2)) return false;
  }

  return true;
}

let count = 0;

// 각 행에 퀸을 두는 행위
function dfs(row) {
  // 퀸을 N개 배치할 수 있는 경우가 생긴 것
  if (row === N) {
    count += 1;
  }

  // 여기서 N 은 열로 파악
  for (let col = 0; col < N; col++) {
    // 현재 위치에 놓을 수 없다면 무시
    if (!isPossiblePosition(row, col)) {
      continue;
    } else {
      queens.push([row, col]); // 현재 row/column 위치에 퀸을 놓기
      dfs(row + 1); // 다음 행으로 넘어감
      queens.pop();
    }
  }
}

dfs(0);

console.log(count);
