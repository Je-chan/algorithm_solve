const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const [N, K] = input[0].split(' ').map(Number);
const [S, X, Y] = input[N + 1].split(' ').map(Number);

const grid = [];
const virusData = [];

for (let i = 0; i < N; i++) {
	grid.push(input[i + 1].split(' ').map(Number));
	for (let j = 0; j < N; j++) {
		if (grid[i][j] !== 0) virusData.push([grid[i][j], 0, i, j]); // [바이러스 번호, 시간, x좌표, y좌표]
	}
}

virusData.sort((a, b) => a[0] - b[0]);

class Queue {
	constructor() {
		this.headIdx = 0;
		this.tailIdx = 0;
		this.items = new Map();
	}

	enqueue(item) {
		this.items.set(this.tailIdx++, item);
	}

	dequeue() {
		const item = this.items.get(this.headIdx);
		this.items.delete(this.headIdx++);
		return item;
	}

	isEmpty() {
		return this.tailIdx - this.headIdx === 0;
	}
}

const queue = new Queue();
for (const item of virusData) {
	queue.enqueue(item);
}

const direction = [
	[0, 1],
	[0, -1],
	[-1, 0],
	[1, 0],
];

while (!queue.isEmpty()) {
	const [virusNum, time, x, y] = queue.dequeue();
	if (time === S) break;

	for (const [dx, dy] of direction) {
		const nx = x + dx;
		const ny = y + dy;
		if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
		if (grid[nx][ny] !== 0) continue;

		grid[nx][ny] = virusNum;
		queue.enqueue([virusNum, time + 1, nx, ny]);
	}
}

console.log(grid[X - 1][Y - 1]);
