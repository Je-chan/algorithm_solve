const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

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

	pop() {
		if (this.heap.lnegth === 0) return null;
		if (this.heap.length === 1) return this.heap.pop();

		const top = this.heap[0];
		this.heap[0] = this.heap.pop();
		this._bubbleDown(0);
		return top;
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

const [V, E] = input[0].split(' ').map(Number);

const S = Number(input[1]);

const graph = Array.from({ length: V + 1 }, () => []);
const dist = Array.from({ length: V + 1 }, () => Infinity);

for (const [u, v, w] of input
	.slice(2)
	.map((line) => line.split(' ').map(Number))) {
	graph[u].push([v, w]);
}

const heap = new MinHeap();

dist[S] = 0;
heap.push([S, 0]);

while (heap.size > 0) {
	const [node, currentDistance] = heap.pop();

	if (dist[node] < currentDistance) continue;

	for (const [nextNode, distance] of graph[node]) {
		const nowDistance = currentDistance + distance;

		if (dist[nextNode] > nowDistance) {
			dist[nextNode] = nowDistance;
			heap.push([nextNode, nowDistance]);
		}
	}
}

dist.slice(1).forEach((dist) => {
	console.log(dist === Infinity ? 'INF' : dist);
});
