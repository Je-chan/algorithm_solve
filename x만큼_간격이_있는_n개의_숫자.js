function solution(x, n) {
  let answer = [];
  let currentX = 0;
  for (let i = 0; i < n; i++) {
    currentX += x;
    answer.push(currentX);
  }
  return answer;
}
