class MinHeap {
	constructor() {
		this.heap = [];
		this.compareFn = (a, b) => a[1] - b[1];
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

			if (target === i) break;

			this._swap(i, target);
			i = target;
		}
	}
}

function solution(N, road, K) {
	const graph = Array.from({ length: N + 1 }, () => []);
	const dist = Array.from({ length: N + 1 }, () => Infinity);

	for (const [u, v, w] of road) {
		graph[u].push([v, w]);
		graph[v].push([u, w]);
	}

	// 출발 마을
	dist[1] = 0;

	const heap = new MinHeap();
	heap.push([1, 0]); // [마을 번호, 시간]

	while (heap.size > 0) {
		const [currentNode, currentTime] = heap.pop();

		if (dist[currentNode] < currentTime) continue;
		for (const [nextNode, time] of graph[currentNode]) {
			const nextTime = currentTime + time;

			if (dist[nextNode] > nextTime) {
				dist[nextNode] = nextTime;
				heap.push([nextNode, nextTime]);
			}
		}
	}

	return dist.slice(1).filter((time) => time <= K).length;
}

console.log(
	solution(
		5,
		[
			[1, 2, 1],
			[2, 3, 3],
			[5, 2, 2],
			[1, 4, 2],
			[5, 3, 1],
			[5, 4, 2],
		],
		3,
	),
);

console.log(
	solution(
		6,
		[
			[1, 2, 1],
			[1, 3, 2],
			[2, 3, 2],
			[3, 4, 3],
			[3, 5, 2],
			[3, 5, 3],
			[3, 6, 1],
		],
		4,
	),
);
