const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

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

	isEmpty() {
		return this.size() === 0;
	}
}


const [s, t] = input[0].split(" ").map(Number)

if(s === t) {
	console.log(0)
}

else {

	const calculate = (value, operator) => {
		switch(operator) {
			case "*":
				return value * value
			case "+":
				return value + value
			case "-":
				return value - value
			case "/":
				return value / value
			default:
				throw new Error("사용할 수 없는 연산자")
		}
	}

	const enqueueNextOperator = (value, currentOperator) => {
		queue.enqueue([value, currentOperator + "*"])
		queue.enqueue([value, currentOperator + "+"])
		queue.enqueue([value, currentOperator + "-"])
		queue.enqueue([value, currentOperator + "/"])
	}

	const queue = new Queue();

	const visitedMap = new Map();

	enqueueNextOperator(s, "")

	let result = ""

	while(!queue.isEmpty()) {
		const [value, operatorList] = queue.dequeue()
		const nowOperator = operatorList[operatorList.length - 1]

		const nextValue = calculate(value, nowOperator)

		if(nextValue === t) {
			result = operatorList
			break;
		}

		if(nextValue > t || visitedMap.has(nextValue)) {
			continue;
		}

		visitedMap.set(nextValue, true)
		enqueueNextOperator(nextValue, operatorList)
	}

	console.log(result || -1)
}
