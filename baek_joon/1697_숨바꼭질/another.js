const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");
const [N, K] = input[0].split(" ").map(Number);

let depth = 0;
let isFound = false;

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

// 각 위치 가지의 최단 시간
const visited = new Array(100001).fill(0);

const bfs = () => {
  const queue = new Queue();
  queue.enqueue(N);
  while (queue.getLength() !== 0) {
    const soobinPosition = queue.dequeue();
    if (soobinPosition === K) {
      return visited[soobinPosition];
    }

    for (const nextPosition of [
      soobinPosition - 1,
      soobinPosition + 1,
      soobinPosition * 2,
    ]) {
      // 공간을 벗어났다면 무시
      if (nextPosition < 0 || nextPosition >= 100001) continue;
      // 아직 방문하지 않은 위치라면
      if (visited[nextPosition] === 0) {
        visited[nextPosition] = visited[soobinPosition] + 1;
        queue.enqueue(nextPosition);
      }
    }
  }
};

console.log(bfs());
