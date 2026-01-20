class Deque {
	constructor() {
		this.headIdx = 0;
		this.tailIdx = 0;
		this.items = new Map()
	}

	isEmpty() {
		return this.headIdx >= this.tailIdx;
	}

	push(value) {
		this.items.set(this.tailIdx++, value)
	}

	pop() {
		if(this.isEmpty()) return;

		this.tailIdx--;
		const item = this.items.get(this.tailIdx)
		this.items.delete(this.tailIdx)
		return item;
	}

	shift() {
		if(this.isEmpty()) return;

		const item = this.items.get(this.headIdx);
		this.items.delete(this.headIdx++)

		return item;
	}

	size() {
		return this.tailIdx - this.headIdx;
	}
}

