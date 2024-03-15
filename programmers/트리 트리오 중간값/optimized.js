function solution(n, edges) {
  // 양방향 그래프 생성
  // 각 노드별로 연결된 노드들을 저장하는 인접 리스트
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  /**
   * BFS로 시작점에서 가장 먼 노드들과 그 거리를 찾는 함수
   * @param {number} start - 시작 노드
   * @returns {[number[], number]} - [가장 먼 노드들의 배열, 최대 거리]
   */
  function bfs(start) {
    // queue: [현재 노드, 시작점으로부터의 거리]
    const queue = [[start, 0]];
    const visited = new Array(n + 1).fill(false);
    visited[start] = true;

    let maxDistance = 0; // 발견된 최대 거리
    let maxNodes = []; // 최대 거리를 가진 노드들

    // BFS 수행
    for (let i = 0; i < queue.length; i++) {
      const [node, dist] = queue[i];

      // 현재까지의 최대 거리보다 큰 거리 발견
      if (dist > maxDistance) {
        maxDistance = dist;
        maxNodes = [node];
      }
      // 현재 최대 거리와 같은 거리 발견
      else if (dist === maxDistance) {
        maxNodes.push(node);
      }

      // 현재 노드의 인접 노드들 탐색
      for (const next of graph[node]) {
        if (!visited[next]) {
          visited[next] = true;
          queue.push([next, dist + 1]);
        }
      }
    }

    return [maxNodes, maxDistance];
  }

  // 트리의 지름을 구하는 과정
  // 1. 임의의 점(1)에서 가장 먼 노드들 찾기
  const [endPoints1] = bfs(1);

  // 2. 찾은 노드에서 가장 먼 노드들 찾기 (트리의 지름)
  const [endPoints2, maxDist] = bfs(endPoints1[0]);

  // 3. 반대쪽 끝점에서 다시 BFS 수행하여 최대 거리 확인
  const [, secondMaxDist] = bfs(endPoints2[0]);

  /**
   * 결과 판단:
   * 1. maxDist === secondMaxDist: 양쪽에서 보는 최대 거리가 같고
   * 2. endPoints1.length > 1 || endPoints2.length > 1:
   *    - 한쪽이라도 최대 거리를 가진 노드가 여러 개인 경우
   *    - 이 경우 세 점을 선택하여 maxDist를 중간값으로 만들 수 있음
   */
  if (
    maxDist === secondMaxDist &&
    (endPoints1.length > 1 || endPoints2.length > 1)
  ) {
    return maxDist;
  }

  // 그 외의 경우, 최대 거리보다 1 작은 값이 최대 중간값
  return maxDist - 1;
}

/**
 * 문제 해결 방법:
 * 1. 트리의 지름을 찾는 방법
 *    - 임의의 점에서 가장 먼 점을 찾고
 *    - 그 점에서 다시 가장 먼 점을 찾으면 트리의 지름
 *
 * 2. 최대 중간값이 나올 수 있는 경우
 *    Case 1: 지름이 같은 경로가 여러 개인 경우
 *    - 이 경우 지름 길이가 최대 중간값
 *
 *    Case 2: 지름이 unique한 경우
 *    - 이 경우 (지름 - 1)이 최대 중간값
 *
 * 시간복잡도: O(N) - 각 BFS가 O(N)이고 총 3번의 BFS 수행
 * 공간복잡도: O(N) - 그래프 저장 및 BFS 용 배열
 */
