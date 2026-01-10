const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

let testCase = Number(input[0])
const testList = input.slice(1).map((data) => data.split(" ").map(Number))

class Queue {
	constructor() {
		this.headIdx = 0;
		this.tailIdx=  0;
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

	size() {
		return this.tailIdx - this.headIdx;
	}
}

const NIGHT_MOVES = [
	[1, 2], [2, 1], [2, -1], [1, -2],
	[-1, -2], [-2, -1], [-2, 1], [-1, 2]
]

let currentIdx = 0
while(testCase--) {
	let N, startPos, targetPos;

	for(let i = currentIdx; i < currentIdx + 3; i++ ) {
		if(i === currentIdx) {
			N = testList[i][0]
		} else if(i === currentIdx + 1) {
			startPos = testList[i]
		} else {
			targetPos = testList[i]
		}
	}

	const queue = new Queue()

	const visited = Array.from({ length: N }, () => Array(N).fill(-1))

	const isVisited = (pos) => {
		const [x, y] = pos
		return visited[x][y] !== -1
	}

	const visitPos = (pos, count) => {
		const [x, y] = pos
		visited[x][y] = count
	}

	const goalPos = (pos) => {
		return pos[0] === targetPos[0] && pos[1] === targetPos[1]
	}

	const getPosTime = (pos) => {
		return visited[pos[0]][pos[1]]
	}

	queue.enqueue(startPos)
	visited[startPos[0]][startPos[1]] = 0

	while(queue.size() > 0) {
		const currentPos = queue.dequeue()

		if(goalPos(currentPos)) {
			console.log(getPosTime(currentPos))
			break;
		}

		for(const move of NIGHT_MOVES) {
			const nextPos = [currentPos[0] + move[0], currentPos[1] + move[1]]

			if(
				nextPos[0] >= 0 && nextPos[0] < N &&
				nextPos[1] >= 0 && nextPos[1] < N &&
				!isVisited(nextPos)
			) {
				visitPos(nextPos, getPosTime(currentPos) + 1)
				queue.enqueue(nextPos)
			}
		}

	}

	currentIdx += 3
}