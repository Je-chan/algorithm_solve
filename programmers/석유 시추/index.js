function solution(land) {

  const rowLength = land.length;
  const columnLength = land[0].length;

  let visited = Array.from({ length: rowLength }, () => new Array(columnLength).fill(false) );
  const resetVisited = () => {
    visited = Array.from({ length: rowLength }, () => new Array(columnLength).fill(false) )
  }

  let oil = 0;
  let count = 0;

  const isOver = (x, y) => {
    return x <= -1 || x >= rowLength|| y <= -1 || y >= columnLength || visited[x][y] || land[x][y] === 0
  }

  const dfs = (land, x, y) => {
    if (isOver(x, y)) {
      return;
    }


    visited[x][y] = true
    count++
    oil = Math.max(oil, count);
    if(visited) {
      dfs(land, x + 1, y)
      dfs(land, x - 1, y)
      dfs(land, x, y + 1)
      dfs(land, x, y - 1)
    }
  }

  for(let y = 0; y < columnLength; y++) {

    for(let x = 0; x < rowLength; x++) {
      dfs(land, x, y)
    }

    resetVisited()
    count = 0
  }

  return oil
}

console.log(solution([[0, 0, 0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 1, 1, 0, 0], [1, 1, 0, 0, 0, 1, 1, 0], [1, 1, 1, 0, 0, 0, 0, 0], [1, 1, 1, 0, 0, 0, 1, 1]]	))
console.log(solution([[1, 0, 1, 0, 1, 1], [1, 0, 1, 0, 0, 0], [1, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0], [1, 0, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]]))