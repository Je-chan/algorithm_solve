function solution(N, number) {
  let answer = 9;

  function findNumber(N, count, before) {
    if (count > 8) return;

    if (before === number) return (answer = Math.min(answer, count));

    let stringN = String(N);
    let numberN = 0;

    for (let i = 1; i < 9; i++) {
      numberN = Number(String(numberN) + stringN);
      findNumber(N, count + i, before + numberN);
      findNumber(N, count + i, before - numberN);
      findNumber(N, count + i, before * numberN);
      findNumber(N, count + i, Math.floor(before / numberN));
    }
  }

  findNumber(N, 0, 0);
  if (answer > 8) return -1;
  return answer;
}
