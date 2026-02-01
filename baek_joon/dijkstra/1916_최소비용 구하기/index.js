const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const N = Number(input[0]);
const M = Number(input[1]);

const graph = Array.from({ length: N + 1 }, () => []);
const dist = Array.from({ length: N + 1 }, () => Infinity);

for (let i = 2; i < M + 2; i++) {
	const [u, v, w] = input[i].split(' ').map(Number);
	graph[u].push([v, w]);
}

class MinHeap {
	constructor() {
		this.heap = [];
		this.compareFn = (a, b) => a[1] - b[1];
	}

	get size() {
		return this.heap.length;
	}

	push(node) {
		this.heap.push(node);
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

	_parent(i) {
		return Math.floor((i - 1) / 2);
	}

	_bubbleUp(i) {
		while (i > 0) {
			const parent = this._parent(i);

			if (this.compareFn(this.heap[parent], this.heap[i]) > 0) {
				this._swap(i, parent);
				i = parent;
			} else {
				break;
			}
		}
	}

	_children(i) {
		return [2 * i + 1, 2 * i + 2];
	}

	_bubbleDown(i) {
		const n = this.heap.length;

		while (true) {
			let target = i;
			const [l, r] = this._children(i);

			if (l < n && this.compareFn(this.heap[l], this.heap[target]) < 0) {
				target = l;
			}

			if (r < n && this.compareFn(this.heap[r], this.heap[target]) < 0) {
				target = r;
			}

			if (target === i) {
				break;
			}

			this._swap(i, target);
			i = target;
		}
	}
}

const heap = new MinHeap();
const [start, end] = input[input.length - 1].split(' ').map(Number);
dist[start] = 0;
heap.push([start, 0]);

while (heap.size > 0) {
	const [currentNode, currentDistance] = heap.pop();

	if (dist[currentNode] < currentDistance) continue;

	const nextNodeList = graph[currentNode];

	for (const [nextNode, distance] of nextNodeList) {
		const newDistance = currentDistance + distance;

		if (dist[nextNode] > newDistance) {
			dist[nextNode] = newDistance;
			heap.push([nextNode, newDistance]);
		}
	}
}

console.log(dist[end]);
