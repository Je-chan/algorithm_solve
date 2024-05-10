const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  peek() {
    return this.items[this.headIndex];
  }

  getLength() {
    return this.tailIndex - this.headIndex;
  }
}

const testCaseList = input
  .slice(1)
  .map((el) => el.split(" ").map(Number))
  .reduce((acc, cur) => {
    if (cur.length === 1) acc.push([cur]);
    else acc[acc.length - 1].push(cur);
    return acc;
  }, []);

const _getNextPosition = (x, y) => {
  return [
    [x + 1, y + 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x + 1, y - 2],
    [x - 1, y - 2],
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y + 2],
  ];
};

const checkIsOutMatrix = (x, y, N) => {
  return x < 0 || x >= N || y < 0 || y >= N;
};

for (const testCase of testCaseList) {
  const N = testCase[0][0];
  const [startX, startY] = testCase[1];
  const [targetX, targetY] = testCase[2];

  const matrix = Array.from(Array(N), () => Array(N).fill(0));

  const bfs = () => {
    const queue = new Queue();
    queue.enqueue([startX, startY]);

    while (queue.getLength() !== 0) {
      const [currentX, currentY] = queue.dequeue();

      // 위치 벗어나면 고려하지 않음
      if (checkIsOutMatrix(currentX, currentY, N)) {
        continue;
      }

      // 현재 위치가 원하는 위치인 경우
      if (currentX === targetX && currentY === targetY) {
        return matrix[currentX][currentY];
      }

      for (const [nextX, nextY] of _getNextPosition(currentX, currentY)) {
        if (checkIsOutMatrix(nextX, nextY, N) || matrix[nextX][nextY] !== 0)
          continue;

        matrix[nextX][nextY] = matrix[currentX][currentY] + 1;
        queue.enqueue([nextX, nextY]);
      }
    }
  };

  console.log(bfs());
}
