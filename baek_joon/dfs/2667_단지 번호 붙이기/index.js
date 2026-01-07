const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const N = Number(input[0])
const household = input.slice(1).map(line => line.split('').map(Number))

let householdNumber = 0;

const unitByHousehold = new Map();
const householdMatrix = Array.from({length: N}, () => Array.from({length: N}).fill(0))

const DIRECTION = [
	[0, 1],
	[0, -1],
	[-1, 0],
	[1, 0]
]

const isInBoundary = (x, y) => {
	return x >= 0 && x < N && y >= 0 && y < N
}

const dfs = (x, y)  => {
	householdMatrix[x][y] = householdNumber
	unitByHousehold.set(householdNumber, (unitByHousehold.get(householdNumber) ?? 0) + 1)

	for(const [dx, dy] of DIRECTION) {
		const nx = x + dx
		const ny = y + dy

		if(isInBoundary(nx, ny) && household[nx][ny] === 1 && !householdMatrix[nx][ny]) {
			householdMatrix[nx][ny] = householdNumber
			dfs(nx, ny)
		}
	}
}

for(let x = 0; x < N; x++) {
	for(let y = 0; y < N ; y++) {
		// 집이 있는 곳을 발견
		if(household[x][y] === 1) {
			// 한 번도 방문한 적이 없는 경우
			if(householdMatrix[x][y] === 0){
				householdNumber++
				dfs(x, y)
			}
		}
	}
}

const result = [...unitByHousehold.values()].sort((a, b) => a - b);
console.log(householdNumber);
result.forEach(v => console.log(v));