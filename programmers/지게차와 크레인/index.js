const EMPTY = '.';

const createPadding = (storage) => {
    const m = storage[0].length;
    const emptyRow = Array(m + 2).fill(EMPTY);
    const storageRow = storage.map(row => [EMPTY, ...row.split(""), EMPTY])
    return [emptyRow, ...storageRow, emptyRow];
}

const workWithCrane = (storage, word) => {
    return storage.map(row => {
        return row.map(item => item === word[0] ? EMPTY : item)
    })
}

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

// ==================== BFS 풀이 ====================
const workWithLiftBFS = (storage, word) => {
    const n = storage.length;
    const m = storage[0].length;
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    const toRemove = [];

    // 외부(0,0)에서 시작 - 패딩된 빈 공간
    const queue = [[0, 0]];
    visited[0][0] = true;

    while (queue.length > 0) {
        const [x, y] = queue.shift();

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (visited[nx][ny]) continue;

            if (storage[nx][ny] === EMPTY) {
                // 빈 공간이면 계속 탐색
                visited[nx][ny] = true;
                queue.push([nx, ny]);
            } else if (storage[nx][ny] === word) {
                // 목표 컨테이너면 제거 대상에 추가
                visited[nx][ny] = true;
                toRemove.push([nx, ny]);
            }
            // 다른 컨테이너면 방문하지 않음 (벽 역할)
        }
    }

    // 제거 대상 컨테이너들을 빈 공간으로 변경
    for (const [x, y] of toRemove) {
        storage[x][y] = EMPTY;
    }

    return storage;
}

// ==================== DFS 풀이 ====================
const workWithLiftDFS = (storage, word) => {
    const n = storage.length;
    const m = storage[0].length;
    const visited = Array.from({length: n}, () => Array(m).fill(false));
    const toRemove = [];

    const dfs = (x, y) => {
        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
            if (visited[nx][ny]) continue;

            if (storage[nx][ny] === EMPTY) {
                visited[nx][ny] = true;
                dfs(nx, ny);
            } else if (storage[nx][ny] === word) {
                visited[nx][ny] = true;
                toRemove.push([nx, ny]);
            }
        }
    }

    // 외부(0,0)에서 시작
    visited[0][0] = true;
    dfs(0, 0);

    for (const [x, y] of toRemove) {
        storage[x][y] = EMPTY;
    }

    return storage;
}

// ==================== Solution ====================
function solution(storage, requests, useDFS = false) {
    let paddedStorage = createPadding(storage);

    for (const request of requests) {
        const useCrane = request.length > 1;

        if (useCrane) {
            paddedStorage = workWithCrane(paddedStorage, request)
        } else {
            if (useDFS) {
                paddedStorage = workWithLiftDFS(paddedStorage, request);
            } else {
                paddedStorage = workWithLiftBFS(paddedStorage, request);
            }
        }
    }

    let result = 0;
    paddedStorage.forEach((row) => row.forEach(item => {
        if (item !== EMPTY) {
            result++;
        }
    }))

    return result;
}

// 테스트
console.log("=== BFS 풀이 ===");
console.log(solution(["AZWQY", "CAABX", "BBDDA", "ACACA"], ["A", "BB", "A"])) // 11
console.log(solution(["HAH", "HBH", "HHH", "HAH", "HBH"], ["C", "B", "B", "B", "B", "H"])) // 4
console.log(solution(["BBB", "BAB", "BBB"], ["A"])) // 9 (A는 내부라 접근 불가)
console.log(solution(["BBB", "BAB", "BBB"], ["AA"])) // 8 (크레인은 내부도 제거)

console.log("\n=== DFS 풀이 ===");
console.log(solution(["AZWQY", "CAABX", "BBDDA", "ACACA"], ["A", "BB", "A"], true)) // 11
console.log(solution(["HAH", "HBH", "HHH", "HAH", "HBH"], ["C", "B", "B", "B", "B", "H"], true)) // 4
console.log(solution(["BBB", "BAB", "BBB"], ["A"], true)) // 9
console.log(solution(["BBB", "BAB", "BBB"], ["AA"], true)) // 8
