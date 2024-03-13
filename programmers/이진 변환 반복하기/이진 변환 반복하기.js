// 이진 변환 횟수와 제거된 0의 개수를 반환하는 함수
function solution(s) {
  // 결과값 배열 생성
  // 첫번째 인덱스 - 변환 횟수
  // 두번째 인덱스 - 0의 개수
  const answer = [0, 0];

  // 주어진 문자열(s)을 담을 변수 생성
  let letterList = s;

  // 'letterList'가 '1'이 될 때까지 반복
  while (letterList !== "1") {
    // 변환 횟수 증가
    answer[0] = answer[0] + 1;

    // 'letterList'를 배열로 변환하여 '0' 제거
    const sliceZero = letterList
      .split("")
      .filter((letter) => {
        // '0'이면 answer[1] 증가(제거된 0의 개수) 및 제거(false 반환)
        if (letter === "0") {
          answer[1] = answer[1] + 1;
          return false;
        }
        // '1'이면 배열에 포함(true 반환)
        return true;
      })
      .join(""); // 배열을 다시 문자열로 병합

    // '1'의 개수를 2진수로 변환하여 'letterList'에 할당
    letterList = sliceZero.length.toString(2);
  }

  // 이진변환 횟수와 제거된 0의 개수 반환
  return answer;
}

console.log(solution("110010101001"));
