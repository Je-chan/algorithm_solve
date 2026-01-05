const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");
const parsedInput = input.map(line => line.split(" ").map(Number))

const OUT_OF_TEST = -1;

let caseCount = 0;
let testStartIdx = 0;
let testRange = OUT_OF_TEST;
let nodeLimit = 0;
let graph = new Map()

const setGraph = (nodeA, nodeB) => {
	graph.set(nodeA, [...(graph.get(nodeA) ?? []), nodeB])
	graph.set(nodeB, [...(graph.get(nodeB) ?? []), nodeA])
}


const getTreeCount = () => {
	let treeCount = 0;
	let brokenTreeFlag = false;

	const visited = new Array(nodeLimit + 1).fill(false);

	const dfs = (currentNode, parentNode) => {
		const possibleRoute = graph.get(currentNode)
		if(possibleRoute == undefined) return 0;

		for(const nextNode of possibleRoute) {
			if(nextNode === parentNode) continue;

			if(visited[nextNode]) {
				brokenTreeFlag = true;
				continue;
			}

			visited[nextNode] = true;
			dfs(nextNode, currentNode);
		}
	}

	for(let i = 1; i <= nodeLimit; i++) {
		if(visited[i]) continue;

		treeCount++;

		visited[i] = true;
		dfs(i, -1);

		if(brokenTreeFlag) {
			treeCount--;
			brokenTreeFlag = false;
		}
	}

	return treeCount
}

const resetTest = () => {
	testStartIdx = 0;
	testRange = OUT_OF_TEST;
	nodeLimit = 0;
	graph = new Map();
}

const makeConsole = (T) => {
	switch(T) {
		case 0:
			console.log(`Case ${caseCount}: No trees.`)
			return;
		case 1:
			console.log(`Case ${caseCount}: There is one tree.`)
			return;
		default:
			console.log(`Case ${caseCount}: A forest of ${T} trees.`)
			return;
	}
}

for(let i = 0; i < parsedInput.length; i++) {
	const [nodeA, nodeB] = parsedInput[i]

	if(nodeA === 0 && nodeB === 0) break;

	if(testRange === OUT_OF_TEST) {
		testStartIdx = i + 1;
		caseCount += 1;
		nodeLimit = nodeA;
		testRange = nodeB;

		// 간선이 0개인 경우 바로 처리!
		if(testRange === 0) {
			const T = getTreeCount();
			makeConsole(T);
			resetTest();
		}
		continue;
	}

	setGraph(nodeA, nodeB);

	// Test 의 마지막 라인인 경우
	if(testStartIdx + testRange - 1 === i) {
		// 트리 개수 계산
		const T = getTreeCount()
		makeConsole(T)
		// 초기화
		resetTest();
	}
}