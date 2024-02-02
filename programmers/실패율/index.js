function solution(N, stages) {
  const challenger = new Array(N + 2).fill(0);

  for (const stage of stages) {
    challenger[stage]++;
  }

  const failure = new Map();
  let players = stages.length;

  for (let i = 1; i <= N; i++) {
    if (players === 0 || challenger[i] === 0) {
      failure.set(i, 0);
    } else {
      failure.set(i, challenger[i] / players);
      players -= challenger[i];
    }
  }

  return [...failure.entries()]
    .sort((a, b) => {
      return b[1] - a[1];
    })
    .map(([stage]) => Number(stage));
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3])); // [3, 4, 2, 1, 5]
console.log(solution(4, [4, 4, 4, 4, 4])); // [4, 1, 2, 3]
