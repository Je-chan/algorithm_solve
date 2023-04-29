/** @format */

const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().split('\n');
const board = [];
for (let i = 0; i < 19; i++) {
  board.push(input[i].split(' ').map(Number));
}

const dx = [0, 1, 1, -1];
const dy = [1, 0, 1, 1];
let find = false;

function solution() {
  for (let x = 0; x < 19; x++) {
    for (let y = 0; y < 19; y++) {
      if (board[x][y] !== 0) {
        const focus = board[x][y];
        for (let i = 0; i < 4; i++) {
          let cnt = 1;
          let nx = x + dx[i];
          let ny = y + dy[i];
          while (
            0 <= nx &&
            nx < 19 &&
            0 <= ny &&
            ny < 19 &&
            board[nx][ny] === focus
          ) {
            cnt++;
            if (cnt === 5) {
              if (
                0 <= x - dx[i] &&
                x - dx[i] < 19 &&
                0 <= y - dy[i] &&
                y - dy[i] < 19 &&
                board[x - dx[i]][y - dy[i]] === focus
              ) {
                break;
              }
              if (
                0 <= nx + dx[i] &&
                nx + dx[i] < 19 &&
                0 <= ny + dy[i] &&
                ny + dy[i] < 19 &&
                board[nx + dx[i]][ny + dy[i]] === focus
              ) {
                break;
              }
              console.log(focus);
              console.log(x + 1, y + 1);
              find = true;
              return;
            }
            nx += dx[i];
            ny += dy[i];
          }
        }
      }
    }
  }
  if (!find) {
    console.log(0);
    return;
  }
}

solution();
