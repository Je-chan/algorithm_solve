const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

class Queue {
	constructor() {
		this.headIdx = 0;
		this.tailIdx = 0;
		this.items = new Map();
	}

	enqueue(item) {
		this.items.set(this.tailIdx++, item)
	}

	dequeue() {
		const item = this.items.get(this.headIdx)
		this.items.delete(this.headIdx++)
		return item;
	}

	isEmpty() {
		return this.tailIdx === this.headIdx;
	}

	size() {
		return this.tailIdx - this.headIdx
	}
}

const [N, K] = input[0].split(" ").map(Number)

const queue = new Queue();

const ORDER = ["+", "-", "x"]

const workWithOrder = (pos, order) => {
	switch(order) {
		case "-":
			return pos - 1;
		case "x":
			return pos * 2;
		default:
			return pos + 1;
	}
}

let count = 0
const MAX = 100001
const minTimePosition = new Array(MAX).fill(-1);
minTimePosition[N] = 0;

queue.enqueue(N);


while(count < MAX) {
	const currentPosition = queue.dequeue()

	if(currentPosition === K) {
		console.log(minTimePosition[currentPosition])
		return
	}


		for(const order of ORDER) {
			const nextPosition = workWithOrder(currentPosition, order)
			if(nextPosition >= 0 && nextPosition < MAX && minTimePosition[nextPosition] === -1) {
				minTimePosition[nextPosition] = minTimePosition[currentPosition] + 1
				queue.enqueue(nextPosition)
		}
	}
	count++
}
