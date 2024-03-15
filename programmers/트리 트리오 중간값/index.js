/**
 * 트리에서 임의의 3점을 선택했을 때 거리의 중간값 중 최댓값을 찾는 함수
 * @param {number} n - 정점의 개수
 * @param {number[][]} edges - 간선 정보
 * @returns {number} - 최대 중간값
 */
function solution(n, edges) {
  // 그래프 생성
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  // BFS로 두 점 사이의 거리를 구하는 함수
  function getDistance(start) {
    const distance = new Array(n + 1).fill(-1);
    const queue = [];

    distance[start] = 0;
    queue.push(start);

    let maxDist = 0;
    let maxNode = start;

    while (queue.length > 0) {
      const current = queue.shift();

      for (const next of graph[current]) {
        if (distance[next] === -1) {
          distance[next] = distance[current] + 1;
          queue.push(next);

          if (distance[next] > maxDist) {
            maxDist = distance[next];
            maxNode = next;
          }
        }
      }
    }

    return [maxNode, distance];
  }

  // 트리의 지름을 구하는 과정
  const [farNode1] = getDistance(1); // 임의의 점에서 가장 먼 점
  const [farNode2, distances1] = getDistance(farNode1); // 그 점에서 가장 먼 점
  const [, distances2] = getDistance(farNode2); // 반대쪽 끝점에서의 거리

  // 각 점에서 farNode1과 farNode2까지의 거리 중 중간값의 최댓값을 찾음
  let result = 0;
  for (let i = 1; i <= n; i++) {
    if (i === farNode1 || i === farNode2) continue;

    const dist = [distances1[i], distances2[i], distances1[farNode2]];
    dist.sort((a, b) => a - b);
    result = Math.max(result, dist[1]); // 중간값
  }

  return result;
}

// 테스트
console.log(
  solution(4, [
    [1, 2],
    [2, 3],
    [3, 4],
  ]),
); // 2
console.log(
  solution(5, [
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
  ]),
); // 2

/**
 * 문제 해결 방법:
 * 1. 트리의 지름을 이루는 두 점을 찾음
 *    - 임의의 점에서 가장 먼 점을 찾고
 *    - 그 점에서 다시 가장 먼 점을 찾음
 *
 * 2. 나머지 모든 점에 대해
 *    - 지름을 이루는 두 점과의 거리를 구함
 *    - 세 거리의 중간값을 구함
 *
 * 3. 모든 중간값 중 최댓값을 반환
 *
 * 시간복잡도: O(N)
 * 공간복잡도: O(N)
 */
