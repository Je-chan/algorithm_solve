const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const [N, E] = input[0].split(' ').map(Number);
const [V1, V2] = input[input.length - 1].split(' ').map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
const dist1 = Array.from({ length: N + 1 }, () => Infinity);
const distV1 = Array.from({ length: N + 1 }, () => Infinity);
const distV2 = Array.from({ length: N + 1 }, () => Infinity);

for (const [u, v, w] of input
	.slice(1, input.length - 1)
	.map((line) => line.split(' ').map(Number))) {
	graph[u].push([v, w]);
	graph[v].push([u, w]);
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

	_children(i) {
		return [2 * i + 1, 2 * i + 2];
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

const dijkstra = (dist, node) => {
	const heap = new MinHeap();
	dist[node] = 0;
	heap.push([node, 0]);

	while (heap.size > 0) {
		const [currentNode, currentDistance] = heap.pop();

		if (dist[currentNode] < currentDistance) continue;

		for (const [nextNode, nextDistance] of graph[currentNode]) {
			const nowDistance = currentDistance + nextDistance;
			if (dist[nextNode] > nowDistance) {
				dist[nextNode] = nowDistance;
				heap.push([nextNode, nowDistance]);
			}
		}
	}

	return dist;
};

dijkstra(dist1, 1);
dijkstra(distV1, V1);
dijkstra(distV2, V2);

const firstPath = dist1[V1] + distV1[V2] + distV2[N];
const secondPath = dist1[V2] + distV2[V1] + distV1[N];

const answer = Math.min(firstPath, secondPath);
console.log(answer === Infinity ? -1 : answer);
