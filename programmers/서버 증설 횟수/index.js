function solution(players, m, k) {
    const history = new Map();

    players.forEach((player, time) => {
        const serverCount = new Array(k - 1).fill(0)
            .map((_, i) => history.get(time - 1 - i) ?? 0)
            .reduce((a, b) => a + b, 0);

        const neededServerCount = Math.floor(player / m);

        if (neededServerCount > serverCount) {
            // 증설
            history.set(time, neededServerCount - serverCount)
        }
    })
    console.log(history)
    return [...history.values()].reduce((a, b) => a + b, 0);
}


console.log(solution([0, 2, 3, 3, 1, 2, 0, 0, 0, 0, 4, 2, 0, 6, 0, 4, 2, 13, 3, 5, 10, 0, 1, 5], 3, 5))
console.log(solution([0, 0, 0, 10, 0, 12, 0, 15, 0, 1, 0, 1, 0, 0, 0, 5, 0, 0, 11, 0, 8, 0, 0, 0], 5, 1))
console.log(solution([0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], 1, 1))
