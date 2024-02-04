function solution(board, moves) {
  let answer = 0;
  const basket = [];
  const N = board.length;
  const stack = new Array(N).fill(0).map(() => []);

  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < N; j++) {
      if (board[i][j] !== 0) {
        stack[j].push(board[i][j]);
      }
    }
  }

  for (const move of moves) {
    const target = stack[move - 1];

    if (target.length === 0) {
      continue;
    }

    if (basket.length === 0) {
      basket.push(target.pop());
    } else if (target[target.length - 1] === basket[basket.length - 1]) {
      basket.pop();
      target.pop();
      answer += 2;
    } else {
      basket.push(target.pop());
    }
  }

  return answer;
}

console.log(
  solution(
    [
      [0, 0, 0, 0, 0],
      [0, 0, 1, 0, 3],
      [0, 2, 5, 0, 1],
      [4, 2, 4, 4, 2],
      [3, 5, 1, 3, 1],
    ],
    [1, 5, 3, 5, 1, 2, 1, 4],
  ),
); // 4
