// [ 삼각 달팽이 ]

function solution(n) {
  let pyramid = [];
  let col = -1;
  let row = 0;
  let number = 1;

  // 피라미드 생성
  for (let i = 1; i < n + 1; i++) {
    let dummy = Array(i).fill(0);
    pyramid.push(dummy);
  }

  // 경로 그대로 추적하는 방식
  // 맨 처음 쓰는 i는 방향을 잡아주는 키로 작동할 것
  // i 는 총 3가지 분기로 나뉜다. 쭉 아래 / 오른쪽 / 위 => %3 으로 분기 처리

  for (let i = 0; i < pyramid.length; i++) {
    for (let j = i; j < pyramid.length; j++) {
      // 밑으로 쭉 내려간다
      if (i % 3 === 0) {
        col += 1;
        // 오른쪽으로 쭉 간다.
      } else if (i % 3 === 1) {
        row += 1;
        //위로 쭉 올라간다.
      } else {
        col -= 1;
        row -= 1;
      }
      pyramid[col][row] = number;
      number += 1;
    }
  }

  return pyramid.flat();
}
