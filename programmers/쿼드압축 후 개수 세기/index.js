/**
 * 2차원 배열의 쿼드 트리 압축 결과를 구하는 함수
 * @param {number[][]} arr - 2차원 정수 배열
 * @returns {number[]} - [0의 개수, 1의 개수]
 */
function solution(arr) {
  const answer = [0, 0]; // [0의 개수, 1의 개수]

  /**
   * 특정 영역이 모두 같은 숫자로 되어있는지 확인하는 함수
   * @param {number} row - 시작 행
   * @param {number} col - 시작 열
   * @param {number} size - 검사할 영역의 크기
   * @returns {boolean} - 모두 같은 숫자인지 여부
   */
  function checkSame(row, col, size) {
    const start = arr[row][col];

    for (let i = row; i < row + size; i++) {
      for (let j = col; j < col + size; j++) {
        if (arr[i][j] !== start) return false;
      }
    }
    return true;
  }

  /**
   * 영역을 재귀적으로 압축하는 함수
   * @param {number} row - 시작 행
   * @param {number} col - 시작 열
   * @param {number} size - 현재 영역의 크기
   */
  function compress(row, col, size) {
    // 현재 영역이 모두 같은 숫자인지 확인
    if (checkSame(row, col, size)) {
      answer[arr[row][col]]++;
      return;
    }

    // 4개의 영역으로 분할
    const newSize = size / 2;
    compress(row, col, newSize); // 좌상
    compress(row, col + newSize, newSize); // 우상
    compress(row + newSize, col, newSize); // 좌하
    compress(row + newSize, col + newSize, newSize); // 우하
  }

  compress(0, 0, arr.length);
  return answer;
}

// 테스트
console.log(
  solution([
    [1, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ]),
); // [4,9]

console.log(
  solution([
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
    [0, 1, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 1, 1],
  ]),
); // [10,15]

/**
 * 문제 해결 방법:
 * 1. 주어진 영역이 모두 같은 숫자인지 확인
 * 2. 같은 숫자면 해당 숫자 카운트 증가
 * 3. 다른 숫자가 있으면 4개의 영역으로 분할하여 재귀 호출
 * 4. 최종적으로 압축된 0과 1의 개수 반환
 *
 * 시간복잡도: O(N^2 * logN) - N은 배열의 한 변의 길이
 * 공간복잡도: O(logN) - 재귀 호출 스택
 */
