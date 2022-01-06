function solution(line) {
  let allIntersection = [];

  for (let i = 0; i < line.length - 1; i++) {
    for (let j = i + 1; j < line.length; j++) {
      const first = line[i];

      const A = first[0];
      const B = first[1];
      const E = first[2];

      const second = line[j];

      const C = second[0];
      const D = second[1];
      const F = second[2];

      const intersection = [];
      if (A * D !== B * C) {
        const x = (B * F - E * D) / (A * D - B * C);
        const y = (E * C - A * F) / (A * D - B * C);
        if (x % 1 === 0 && y % 1 === 0) intersection.push(x, y);
      }

      if (intersection.length !== 0) allIntersection.push(intersection);
    }
  }

  let maxX = Number.MIN_SAFE_INTEGER;
  let minX = Number.MAX_SAFE_INTEGER;
  let maxY = Number.MIN_SAFE_INTEGER;
  let minY = Number.MAX_SAFE_INTEGER;

  for (let el of allIntersection) {
    if (maxX < el[0]) maxX = el[0];
    if (minX > el[0]) minX = el[0];
    if (maxY < el[1]) maxY = el[1];
    if (minY > el[1]) minY = el[1];
  }

  let coordinate = Array.from({ length: maxY - minY + 1 }, () =>
    new Array(maxX - minX + 1).fill('.')
  );
  for (let el of allIntersection) {
    coordinate[maxY - el[1]][el[0] - minX] = '*';
  }

  return coordinate.map((el) => el.join(''));
}
