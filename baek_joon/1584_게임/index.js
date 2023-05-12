/** @format */

const fs = require('fs');

const INF = Number.MAX_SAFE_INTEGER;
const n = parseInt(fs.readFileSync('../dev/stdin').toString().split('\n')[0]);
let dangers = [];
for (let i = 1; i <= n; i++) {
  let [x1, y1, x2, y2] = fs
    .readFileSync('../dev/stdin')
    .toString()
    .split('\n')
    [i].split(' ')
    .map(Number);
  if (x1 > x2) {
    [x1, x2] = [x2, x1];
  }
  if (y1 > y2) {
    [y1, y2] = [y2, y1];
  }
  dangers.push([x1, y1, x2, y2]);
}

const m = parseInt(
  fs.readFileSync('../dev/stdin').toString().split('\n')[n + 1]
);
let deaths = [];
for (let i = n + 2; i <= n + m + 1; i++) {
  let [x1, y1, x2, y2] = fs
    .readFileSync('../dev/stdin')
    .toString()
    .split('\n')
    [i].split(' ')
    .map(Number);
  if (x1 > x2) {
    [x1, x2] = [x2, x1];
  }
  if (y1 > y2) {
    [y1, y2] = [y2, y1];
  }
  deaths.push([x1, y1, x2, y2]);
}

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function dijkstra() {
  let distances = Array.from(Array(501), () => Array(501).fill(INF));
  distances[0][0] = 0;
  let pq = [];
  pq.push([0, 0, 0]);

  while (pq.length > 0) {
    let [cur_cost, cur_row, cur_col] = pq.shift();
    if (distances[cur_row][cur_col] < cur_cost) continue;

    for (let i = 0; i < 4; i++) {
      let [x, y] = [dx[i], dy[i]];
      let [next_row, next_col] = [cur_row + y, cur_col + x];
      if (next_row < 0 || next_col < 0 || next_row > 500 || next_col > 500)
        continue;

      let flag = false;
      for (let [x1, y1, x2, y2] of deaths) {
        if (
          x1 <= next_col &&
          next_col <= x2 &&
          y1 <= next_row &&
          next_row <= y2
        ) {
          flag = true;
          break;
        }
      }
      if (flag) continue;

      let next_cost = 0;
      for (let [x1, y1, x2, y2] of dangers) {
        if (
          x1 <= next_col &&
          next_col <= x2 &&
          y1 <= next_row &&
          next_row <= y2
        ) {
          next_cost += 1;
          break;
        }
      }

      if (distances[next_row][next_col] > next_cost + cur_cost) {
        distances[next_row][next_col] = next_cost + cur_cost;
        pq.push([next_cost + cur_cost, next_row, next_col]);
      }
    }
  }
  return distances[500][500];
}

const distance = dijkstra();
if (distance === INF) console.log(-1);
else console.log(distance);
