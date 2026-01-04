const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const parsedInput = input.map(line => line.split(" ").map(Number))
const [N, M] = parsedInput[0]

const graph = new Map()


for(let i = 1 ; i < N ; i++ ){
	const [nodeA, nodeB, distance] = parsedInput[i]
	graph.set(nodeA, [...(graph.get(nodeA) ?? []), [nodeB, distance]])
	graph.set(nodeB, [...(graph.get(nodeB) ?? []), [nodeA, distance]])
}

const dfs = (start, to, visited, distance) => {
	if(start === to) {
		console.log(distance)
		return true;
	}

	const possible = graph.get(start)

	for(const [destination, newDistance] of possible) {
		if(visited[destination]) continue;

		visited[destination] = true;

		if(dfs(destination, to, visited, distance + newDistance)) break;

		visited[destination] = false;
	}
}


for(let j = N; j < N + M; j++) {
	const [start, end] = parsedInput[j]

	const visited = new Array(N + 1).fill(false)
	visited[start] = true

	dfs(start, end, visited, 0)
}