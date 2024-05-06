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
function bfs(graph, start, visited) {
  const queue = new Queue();
  queue.enqueue(start);
  // 현재 노드 방문 처리
  visited[start] = true;

  // 큐가 빌 때까지 반복
  while (queue.getLength() !== 0) {
    const v = queue.dequeue();
    console.log(v);

    for (const node of graph[v]) {
      if (!visited[node]) {
        queue.enqueue(node);
        visited[node] = true;
      }
    }
  }
}

const graph = [[], [2, 3, 4], [1], [1, 5, 6], [1, 7], [3, 8], [3], [4], [5]];

let visited = new Array(9).fill(false);

bfs(graph, 1, visited);
