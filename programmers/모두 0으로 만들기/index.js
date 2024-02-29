/**
 * 트리의 모든 정점의 가중치를 0으로 만드는 최소 연산 횟수를 구하는 함수
 * @param {number[]} a - 각 정점의 가중치 배열
 * @param {number[][]} edges - 간선 정보를 담은 2차원 배열
 * @returns {number} - 최소 연산 횟수 또는 불가능한 경우 -1
 */
function solution(a, edges) {
  // 모든 정점의 가중치 합이 0이 아니면 불가능
  if (a.reduce((sum, val) => sum + val, 0) !== 0) {
    return -1;
  }

  const n = a.length; // 정점의 개수
  let result = 0n; // BigInt로 결과값 선언 (큰 수 처리를 위해)

  // 그래프를 인접 리스트로 구현
  const graph = Array.from({ length: n }, () => []);
  for (const [nodeA, nodeB] of edges) {
    graph[nodeA].push(nodeB);
    graph[nodeB].push(nodeA);
  }

  /**
   * DFS로 트리를 순회하면서 가중치를 부모 노드로 전달
   * @param {number} child - 현재 노드
   * @param {number} parent - 부모 노드
   */
  function dfs(child, parent) {
    // 현재 노드의 모든 자식 노드를 순회
    for (const nextNode of graph[child]) {
      // 부모 노드가 아닌 경우에만 처리 (이미 방문한 노드 방지)
      if (nextNode !== parent) {
        dfs(nextNode, child);
        // 자식 노드의 가중치를 부모 노드로 이동
        a[child] += a[nextNode];
        // 이동시킨 가중치의 절댓값을 결과에 추가
        result += BigInt(Math.abs(a[nextNode]));
        // 자식 노드의 가중치를 0으로 초기화
        a[nextNode] = 0;
      }
    }
  }

  // 루트 노드(0)부터 DFS 시작
  dfs(0, 0);

  // 결과가 안전한 정수 범위를 넘어갈 수 있으므로 BigInt 사용
  return result <= Number.MAX_SAFE_INTEGER ? Number(result) : -1;
}

// 테스트
const a = [-5, 0, 2, 1, 2];
const edges = [
  [0, 1],
  [3, 4],
  [2, 3],
  [0, 3],
];
console.log(solution(a, edges)); // 예상 출력: 9

/**
 * 문제 해결 아이디어:
 * 1. 모든 정점의 가중치 합이 0이어야 가능한 문제
 * 2. 리프 노드부터 부모로 가중치를 전달하면서 0으로 만듦
 * 3. 각 전달 과정에서 이동하는 가중치의 절댓값이 연산 횟수
 *
 * 시간 복잡도: O(N) - N은 정점의 개수
 * 공간 복잡도: O(N) - 그래프 저장을 위한 공간
 */
