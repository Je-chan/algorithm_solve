/**
 * 주어진 숫자보다 크고 비트가 1~2개 다른 가장 작은 수를 찾는 함수
 * @param {number[]} numbers - 숫자 배열
 * @returns {number[]} - 각 숫자에 대한 결과 배열
 */
function solution(numbers) {
  return numbers.map((number) => {
    // 이진수 변환 및 앞에 '0' 추가
    let binNumber = "0" + number.toString(2);

    // 배열로 변환
    let binArr = [...binNumber];

    // 마지막 '0'의 위치 찾기
    let idx = binNumber.lastIndexOf("0");

    // 해당 위치의 '0'을 '1'로 변경
    binArr[idx] = "1";

    // 홀수인 경우 다음 위치의 '1'을 '0'으로 변경
    if (number % 2 === 1) {
      binArr[idx + 1] = "0";
    }

    // 다시 이진수 문자열로 합친 후 10진수로 변환
    return parseInt(binArr.join(""), 2);
  });
}

// 테스트
console.log(solution([2, 7])); // [3, 11]

/**
 * 문제 해결 아이디어:
 * 1. 이진수 앞에 0을 추가하여 항상 왼쪽에 0이 있도록 보장
 * 2. 마지막 0을 1로 변경
 * 3. 홀수인 경우 그 다음 비트를 0으로 변경
 *
 * 예시:
 * 2(10) -> 3(11): 마지막 0을 1로 변경
 * 7(111) -> 11(1011):
 *   - 앞에 0 추가: 0111
 *   - 0을 1로 변경: 1111
 *   - 다음 비트를 0으로: 1011
 */
