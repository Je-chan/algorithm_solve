function solution(name) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let idx = alphabet.indexOf(name[0]);
  let score = 26 - idx < idx ? 26 - idx : idx;

  // 연속한 A들은 인덱스 값으로 배열에 묶어서 idxA 에 들어갈 것.
  let idxA = [];

  for (let i = 1; i < name.length; i++) {
    idx = alphabet.indexOf(name[i]);

    // idx === 0 이라면 A 라는 얘기
    if (idx === 0) {
      const last = idxA.length - 1;
      if (idxA.length === 0) idxA.push([i]);
      // 연속하는 A의 경우 배열에 push 로 넣어서 한 패밀리로 만든다.
      else if (idxA[last][idxA[last].length - 1] === i - 1) idxA[last].push(i);
      // 연속하지 않는 경우 idxA 안에 새로운 배열로 push
      else idxA.push([i]);
    }

    score += (26 - idx < idx ? 26 - idx : idx) + 1;
  }

  if (idxA.length === 0) return score;

  // 각 요소의 length를 구한다 => 연속하는 A의 길이, length가 된다.
  let length = idxA.map((el) => el.length);
  // 가장 긴 길이를 가져온다
  let largest = Math.max(...length);
  let largestIdx = length.findIndex((el) => el === largest);
  // 가장 긴 길이의 연속 A패밀리를 가져온다
  let longestA = idxA[largestIdx];

  // 연속 A 패밀리의 0 번째 인덱스 = 역방향으로 돌아갈 때 걸리는 거리
  // largest = 정방향으로 갈 때 걸리는 거리
  if (longestA[0] <= largest) {
    // 연속하는 A의 마지막이 name 의 마지막에 있는 경우 되돌아갈 필요 없음
    if (longestA[longestA.length - 1] === name.length - 1) {
      score = score - largest;
    } else {
      score = score - largest + longestA[0] - 1;
    }
  }

  return score;
}
