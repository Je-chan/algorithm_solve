const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const edges = input.slice(1).map((line) => line.split(' ').map(Number));

const dist = Array.from({ length: N + 1 }, () => Infinity);

dist[1] = 0;

const checkMin = (A, B, C) => {
	return dist[A] !== Infinity && dist[B] > dist[A] + C;
};

for (let i = 1; i <= N - 1; i++) {
	for (const [A, B, C] of edges) {
		if (checkMin(A, B, C)) {
			dist[B] = dist[A] + C;
		}
	}
}

let noMinusCycle = true;

for (const [A, B, C] of edges) {
	if (checkMin(A, B, C)) {
		noMinusCycle = false;
		console.log(-1);
		break;
	}
}

if (noMinusCycle) {
	dist.slice(2).forEach((time) => {
		console.log(time === Infinity ? -1 : time);
	});
}
