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
		return [i * 2 + 1, i * 2 + 2];
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

function dijkstra(dist, start, graph) {
	const heap = new MinHeap();
	dist[start] = 0;
	heap.push([start, 0]);

	while (heap.size > 0) {
		const [currentNode, currentCost] = heap.pop();
		if (dist[currentNode] < currentCost) continue;

		for (const [nextNode, nextCost] of graph[currentNode]) {
			const newCost = currentCost + nextCost;

			if (dist[nextNode] > newCost) {
				dist[nextNode] = newCost;
				heap.push([nextNode, newCost]);
			}
		}
	}
}

function solution(n, s, a, b, fares) {
	const distS = Array.from({ length: n + 1 }, () => Infinity);
	const distA = Array.from({ length: n + 1 }, () => Infinity);
	const distB = Array.from({ length: n + 1 }, () => Infinity);

	const graph = Array.from({ length: n + 1 }, () => []);

	for (const [c, d, f] of fares) {
		graph[c].push([d, f]);
		graph[d].push([c, f]);
	}

	dijkstra(distS, s, graph);
	dijkstra(distA, a, graph);
	dijkstra(distB, b, graph);

	let minCost = Infinity;

	for (let stopover = 1; stopover <= n; stopover++) {
		if (distS[stopover] === Infinity) continue;
		if (distA[stopover] === Infinity) continue;
		if (distB[stopover] === Infinity) continue;

		minCost = Math.min(
			minCost,
			distS[stopover] + distA[stopover] + distB[stopover],
		);
	}

	return minCost;
}

console.log(
	solution(6, 4, 6, 2, [
		[4, 1, 10],
		[3, 5, 24],
		[5, 6, 2],
		[3, 1, 41],
		[5, 1, 24],
		[4, 6, 50],
		[2, 4, 66],
		[2, 3, 22],
		[1, 6, 25],
	]),
);

console.log(
	solution(7, 3, 4, 1, [
		[5, 7, 9],
		[4, 6, 4],
		[3, 6, 1],
		[3, 2, 3],
		[2, 1, 6],
	]),
);

console.log(
	solution(6, 4, 5, 6, [
		[2, 6, 6],
		[6, 3, 7],
		[4, 6, 7],
		[6, 5, 11],
		[2, 5, 12],
		[5, 3, 20],
		[2, 4, 8],
		[4, 3, 9],
	]),
);
