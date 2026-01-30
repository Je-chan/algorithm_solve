class MinHeapByHeap extends Heap {
	constructor() {
		super((a, b) => a - b);
	}
}

class MinHeap {
	constructor() {
		this.heap = [];
		this.compareFn = (a, b) => a - b;
	}

	get size() {
		return this.heap.length;
	}

	peek() {
		return this.heap[0] ?? null;
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

	_parent(i) {
		return Math.floor((i - 1) / 2);
	}

	_left(i) {
		return 2 * i + 1;
	}

	_right(i) {
		return 2 * i + 2;
	}

	_swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	_bubbleUp(i) {
		while (i > 0) {
			const parentIdx = this._parent(i);

			if (this.compareFn(this.heap[parentIdx], this.heap[i]) > 0) {
				this._swap(i, parentIdx);
				i = parentIdx;
			} else {
				break;
			}
		}
	}

	_bubbleDown(i) {
		const n = this.heap.length;

		while (true) {
			let target = i;
			const l = this._left(i);
			const r = this._right(i);

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
