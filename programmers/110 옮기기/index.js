/**
 * 이진 문자열 배열을 받아서 각 문자열의 "110" 패턴을 재배치하여
 * 사전순으로 가장 앞에 오는 문자열들의 배열을 반환하는 함수
 * @param {string[]} s - 변형시킬 이진 문자열 배열
 * @returns {string[]} - 변형된 이진 문자열 배열
 */
function solution(s) {
  // 입력받은 배열의 각 문자열을 변환
  return s.map((v) => {
    // 스택: "110" 패턴을 찾기 위해 문자들을 임시 저장
    const stack = [];
    // "110" 패턴의 발견 횟수를 카운트
    let count110 = 0;

    // 문자열을 한 글자씩 순회
    for (const char of v) {
      // 스택에 2개 이상의 문자가 있고
      // 마지막 두 문자가 '11'이며 현재 문자가 '0'인 경우
      if (
        stack.length > 1 &&
        stack[stack.length - 2] === "1" &&
        stack[stack.length - 1] === "1" &&
        char === "0"
      ) {
        // "110" 패턴을 발견했으므로 카운트 증가
        count110++;
        // 스택에서 "11" 제거 ("0"은 push하지 않음)
        stack.pop();
        stack.pop();
      } else {
        // "110" 패턴이 아닌 경우 스택에 현재 문자 추가
        stack.push(char);
      }
    }

    // 남은 문자열 생성 (스택에 남은 문자들)
    const baseStr = stack.join("");
    // 마지막 '0'의 위치 찾기 (없으면 -1이 반환되므로 +1하면 0이 됨)
    const zeroIdx = baseStr.lastIndexOf("0") + 1;
    // 발견된 "110" 패턴들을 한 번에 생성
    const pattern110 = "110".repeat(count110);

    // 최종 문자열 생성:
    // 1. zeroIdx가 0이 아니면 (0이 존재하면):
    //    - 마지막 0까지의 문자열 + 110패턴들 + 나머지 문자열
    // 2. zeroIdx가 0이면 (0이 없으면):
    //    - 110패턴들 + 남은 문자열
    return zeroIdx
      ? baseStr.slice(0, zeroIdx) + pattern110 + baseStr.slice(zeroIdx)
      : pattern110 + baseStr;
  });
}

/*
코드 동작 예시:
입력: "1110"
1. 스택 처리:
   - '1' 스택에 추가 [1]
   - '1' 스택에 추가 [1,1]
   - '1'과 '0' 비교 -> "110" 패턴 발견
   - count110 증가, "11" 제거 []
2. 남은 문자열 ""에 "110" 삽입
   결과: "1101"

입력: "011111010"
1. 스택 처리:
   - 패턴 매칭하며 "110" 찾기
   - 발견된 "110" 패턴들 카운트
2. 마지막 0 위치 찾아서 그 뒤에 "110" 패턴들 삽입
   결과: "0110110111"
*/

console.log(solution(["1110", "10011100", "011111010"]));
