class Heap {
	constructor(compareFn) {
		this.heap = [];
		this.compareFn = compareFn;
	}

	get size() {
		return this.heap.length;
	}

	peek() {
		return this.heap[0] ?? null;
	}

	push(value) {
		this.heap.push(value);
		this._bubbleUp(this.heap.length - 1);
	}

	pop() {
		if (this.heap.length === 0) return null;
		if (this.heap.length === 1) return this.heap.pop();

		const top = this.heap[0];
		this.heap[top] = this.heap.pop();
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
			const parent = this._parent(i);
			if (this.compareFn(this.heap[i], this.heap[parent]) < 0) {
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
			const l = this._left(i);
			const r = this._right(i);

			if (l < n && this.compareFn(this.heap[l], this.heap[target]) < 0)
				target = l;
			if (r < n && this.compareFn(this.heap[r], this.heap[target]) < 0)
				target = r;

			if (target === i) break;

			this._swap(i, target);
			i = target;
		}
	}
}
