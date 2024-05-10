const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const dx = [-2, -2, -1, -1, , 1, 1, 2, 2];
const dy = [-1, 1, -2, 2, -2, 2, -1, 1];

let testCases = Number(input[0]);
let line = 1;

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

while (testCases--) {
  let l = Number(input[line]);

  let [x, y] = input[line + 1].split(" ").map(Number); // 현재 위치
  let [targetX, targetY] = input[line + 2].split(" ").map(Number); // 목표 위치

  const visited = []; // 방문 정보

  for (let i = 0; i < l; i++) {
    visited.push(new Array(l).fill(0));
  }

  const queue = new Queue();
  queue.enqueue([x, y]);

  visited[x][y] = 1;

  while (queue.getLength() !== 0) {
    const [x, y] = queue.dequeue();
    for (let i = 0; i < 8; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || nx >= l || ny < 0 || ny >= l) continue; // 공간을 벗어난 경우 무시

      // 방문하지 않은 곳인 경우
      if (visited[nx][ny] === 0) {
        visited[nx][ny] = visited[x][y] + 1;
        queue.enqueue([nx, ny]);
      }
    }
  }

  line += 3;
  console.log(visited[targetX][targetY] - 1);
}
