const fs = require("fs");

const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 테스트 케이스 파싱
const testList = [];
for (let i = 1; i < input.length; i++) {
	if (i % 2 === 0) {
		testList.push(input[i].split(" ").map(Number));
	}
}

for (const testCase of testList) {
	const choice = [0, ...testCase];
	const N = choice.length;

	const state = Array(N).fill(0);
	// 팀에 속하는 학생 수
	let teamCount = 0;

	// 각 학생에서 DFS 시작
	const dfs = (start) => {
		const path = [];  // 현재 경로 저장
		let cur = start;

		// 미방문 노드를 따라 경로 구성
		while (state[cur] === 0) {
			state[cur] = 1;       // 현재 경로에 추가
			path.push(cur);
			cur = choice[cur];    // 다음 학생으로 이동
		}

		// 현재 경로에서 사이클 발견
		if (state[cur] === 1) {
			// 사이클 시작점(cur) 찾아서 그 지점부터 팀으로 카운트
			const cycleStartIdx = path.indexOf(cur);
			teamCount += path.length - cycleStartIdx;
		}

		// 경로의 모든 노드를 완료 처리
		path.forEach(node => state[node] = 2);
	};

	// 모든 학생에 대해 DFS (이미 방문한 건 스킵됨)
	for (let i = 1; i < N; i++) {
		if (state[i] === 0) {
			dfs(i);
		}
	}

	// 팀에 속하지 않은 학생 수 = 전체 - 팀원 수
	console.log(N - 1 - teamCount);
}