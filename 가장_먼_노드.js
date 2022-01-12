function solution(n, edge) {
  let levelBefore = [1];

  while (true) {
    let levelAfter = [];

    edge = edge.filter((node) => {
      if (levelBefore.includes(node[0]) && levelBefore.includes(node[1])) {
        return false;
      } else if (levelBefore.includes(node[0])) {
        levelAfter.push(node[1]);
        return false;
      } else if (levelBefore.includes(node[1])) {
        levelAfter.push(node[0]);
        return false;
      }
      return true;
    });

    if (edge.length === 0 && levelAfter.length === 0) break;

    levelBefore = [...new Set(levelAfter)];
  }

  return levelBefore.length;
}
