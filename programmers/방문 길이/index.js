function isOutOfBoard(coordinate) {
	const [x, y] = coordinate;
	return x < -5 || x > 5 || y < -5 || y > 5;
}

function move(x, y, dir) {
	switch (dir) {
		case 'U':
			return [x, y + 1];
		case 'D':
			return [x, y - 1];
		case 'R':
			return [x + 1, y];
		case 'L':
			return [x - 1, y];
	}
}

function solution(dirs) {
	let x = 0;
	let y = 0

	const visited = new Set();

	for (const dir of dirs) {
		const next = move(x, y, dir);
		if (isOutOfBoard(next)) continue;

		const path = `${x}${y}${next[0]}${next[1]}`;
		const reversePath = `${next[0]}${next[1]}${x}${y}`;

		visited.add(path);
		visited.add(reversePath);

		[x, y] = next;
	}

	return visited.size / 2;
}

console.log(solution("ULURRDLLU")); // 7
console.log(solution("LULLLLLLU")); // 7