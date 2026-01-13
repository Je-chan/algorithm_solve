const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const jumpList = input[1].split(" ").map(Number);


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
		return this.headIdx - this.tailIdx === 0;
	}
 }

const queue = new Queue();
const visited = new Array(N).fill(-1);

queue.enqueue(0)
visited[0] = 0;

while(!queue.isEmpty()) {
	const currentPos = queue.dequeue()
	const possibleJump = jumpList[currentPos]

	for(let i = 1 ; i <= possibleJump; i++) {
		const nextPos = currentPos + i;

		if(visited[nextPos] !== -1 || nextPos >= N || nextPos === 0) continue;

		visited[nextPos] = visited[currentPos] + 1;

		queue.enqueue(nextPos)
	}
}
console.log(visited[N - 1])