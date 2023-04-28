/** @format */

const fs = require('fs');

const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
let i = 0;

while (true) {
  const [w, h] = input[i++].split(' ').map(Number);
  if (w === 0 && h === 0) break;

  const squareMap = input
    .slice(i, i + h)
    .map((row) => row.split(' ').map(Number));
  i += h;

  const position = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const findIsland = (x, y) => {
    if (x < 0 || x >= h || y < 0 || y >= w) return false;

    if (squareMap[x][y] === 1) {
      squareMap[x][y] = 0;
      for (let i = 0; i < 8; i++) {
        findIsland(x + position[i][0], y + position[i][1]);
      }
      return true;
    }
    return false;
  };

  let island = 0;

  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (findIsland(i, j)) {
        island++;
      }
    }
  }
  console.log(island);
}
