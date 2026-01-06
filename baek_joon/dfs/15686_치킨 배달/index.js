const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const [N, M] = input[0].split(" ").map(Number);
const village = input.slice(1).map(line => line.split(" ").map(Number));

// 치킨집과 집 좌표 수집
const chickenPositions = [];
const housePositions = [];

for (let x = 0; x < N; x++) {
	for (let y = 0; y < N; y++) {
		if (village[x][y] === 2) {
			chickenPositions.push([x, y]);
		} else if (village[x][y] === 1) {
			housePositions.push([x, y]);
		}
	}
}

const getDistance = ([r1, c1], [r2, c2]) => Math.abs(r1 - r2) + Math.abs(c1 - c2);

const calcCityChickenDistance = (selectedChickens) => {
	return housePositions.reduce((total, house) => {
		const minDistance = selectedChickens.reduce((min, chicken) => {
			return Math.min(min, getDistance(house, chicken));
		}, Infinity);
		return total + minDistance;
	}, 0);
};

let result = Infinity;

const dfs = (startIdx, selected) => {
	if (selected.length === M) {
		result = Math.min(result, calcCityChickenDistance(selected));
		return;
	}

	for (let i = startIdx; i < chickenPositions.length; i++) {
		selected.push(chickenPositions[i]);
		dfs(i + 1, selected);  // 다음은 i+1부터 시작
		selected.pop();        // 백트래킹
	}
};

dfs(0, []);

console.log(result);