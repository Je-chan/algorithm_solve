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
		const item = this.items.get(this.headIdx);
		this.items.delete(this.headIdx++)
		return item;
	}

	size() {
		return this.items.size
	}

	clear() {
		this.items.clear()
	}
}

let N = Number(input[0]);

const testList = input.slice(1).map(data => data.split(" ").map(Number));

let testStartIdx = 0;
while(N--) {
	const [V, E] = testList[testStartIdx];
	const graph = Array.from({length: V + 1}).fill(0).map(() => []);
	const visited = new Array(V + 1).fill(0);

	for(let i = testStartIdx + 1; i <= testStartIdx + E; i++) {
		const [startNode, endNode] = testList[i];
		graph[startNode].push(endNode);
		graph[endNode].push(startNode);
	}

	const queue = new Queue();

	let flag = true;
	for(let i = 1; i < V + 1; i++) {
		if(!flag) break;
		if(visited[i] !== 0) continue;

		queue.enqueue(i);
		visited[i] = 1;

		while(queue.size() > 0) {
			const currentNode = queue.dequeue();
			const groupName = visited[currentNode];

			const nodeList = graph[currentNode];

			for(const nextNode of nodeList) {
				if(visited[nextNode] === 0) {
					queue.enqueue(nextNode);
					visited[nextNode] = groupName === 1 ? 2 : 1;
				} else if(visited[nextNode] === groupName) {
					flag = false;
					queue.clear();
					break;
				}
			}
		}
	}

	testStartIdx += E + 1

	console.log(flag ? "YES" : "NO")
}