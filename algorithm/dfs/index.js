// DFS 메서드 정의
function dfs(graph, v, visited) {
  // 현재 노드 방문 처리
  visited[v] = true;

  console.log(v);

  // 현재 노드와 연결된 다른 노드 재귀적으로 방문
  for (const index of graph[v]) {
    if (!visited[index]) {
      dfs(graph, index, visited);
    }
  }
}

// 각 노드가 연결된 정보
// 0 번 노드를 사용하지 않도록 하기 위해서 일부러 노드를 빈배열로 하나 만듦. 메모리에서 그렇게 크게 필요하진 않음.
const graph = [[], [2, 3, 4], [1], [1, 5, 6], [1, 7], [3, 8], [3], [4], [5]];

let visited = new Array(9).fill(false);

dfs(graph, 1, visited);
