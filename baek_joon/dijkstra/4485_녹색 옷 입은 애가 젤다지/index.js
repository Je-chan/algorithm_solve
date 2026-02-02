const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

class MinHeap {
	constructor() {
		this.heap = [];
	}

	get size() {
		return this.heap.length;
	}

	push(item) {
		this.heap.push(item);
		this._bubbleUp(this.heap.length - 1);
	}

	pop() {
		if (this.heap.length === 0) return null;
		if (this.heap.length === 1) return this.heap.pop();
		const top = this.heap[0];
		this.heap[0] = this.heap.pop();
		this._bubbleDown(0);
		return top;
	}

	_swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	_bubbleUp(i) {
		while (i > 0) {
			const parent = Math.floor((i - 1) / 2);
			if (this.heap[parent][0] > this.heap[i][0]) {
				this._swap(i, parent);
				i = parent;
			} else break;
		}
	}

	_bubbleDown(i) {
		const n = this.heap.length;
		while (true) {
			let target = i;
			const l = 2 * i + 1;
			const r = 2 * i + 2;
			if (l < n && this.heap[l][1] < this.heap[target][1]) target = l;
			if (r < n && this.heap[r][1] < this.heap[target][1]) target = r;
			if (target === i) break;
			this._swap(i, target);
			i = target;
		}
	}
}

const direction = [
	[0, 1], // 상
	[0, -1], // 하
	[-1, 0], // 좌
	[1, 0], // 우
];

function solve(N, grid) {
	const dist = Array.from({ length: N }, () =>
		Array.from({ length: N }, () => Infinity),
	);

	dist[0][0] = grid[0][0];
	const heap = new MinHeap();
	heap.push([[0, 0], grid[0][0]]);

	while (heap.size > 0) {
		const data = heap.pop();
		const position = data[0];
		const cost = data[1];
		const [currentX, currentY] = position;

		if (dist[currentX][currentY] < cost) continue;

		for (const [dx, dy] of direction) {
			const nextX = currentX + dx;
			const nextY = currentY + dy;

			if (nextX < 0 || nextY < 0 || nextX >= N || nextY >= N) continue;
			const nextCost = cost + grid[nextX][nextY];

			if (dist[nextX][nextY] > nextCost) {
				dist[nextX][nextY] = nextCost;
				heap.push([[nextX, nextY], nextCost]);
			}
		}
	}

	return dist[N - 1][N - 1];
}

let idx = 0;
let problem = 1;
const results = [];

while (idx < input.length) {
	const N = Number(input[idx++]);
	if (N === 0) break;

	const grid = [];
	for (let i = 0; i < N; i++) {
		grid.push(input[idx++].split(' ').map(Number));
	}

	results.push(`Problem ${problem++}: ${solve(N, grid)}`);
}

console.log(results.join('\n'));
