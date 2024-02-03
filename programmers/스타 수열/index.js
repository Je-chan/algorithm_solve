/**
 * 스타 수열의 최대 길이를 구하는 함수
 * @param {number[]} a - 입력 배열
 * @returns {number} - 스타 수열의 최대 길이 또는 -1
 */
function solution(a) {
  let answer = -1;

  // Counter 구현: 각 요소의 등장 횟수를 객체로 저장
  const els = {};
  for (const num of a) {
    els[num] = (els[num] || 0) + 1;
  }

  // 각 숫자를 기준으로 스타수열 만들기 시도
  for (const k in els) {
    // 현재 k의 등장횟수가 이전에 찾은 최대 길이보다 작으면 스킵
    if (els[k] <= answer) {
      continue;
    }

    // k를 공통 원소로 하는 스타수열 찾기
    let cnt = 0; // k가 사용된 횟수
    let idx = 0; // 현재 검사중인 인덱스

    while (idx < a.length - 1) {
      // 현재와 다음 원소가 모두 k가 아니거나
      // 현재와 다음 원소가 같으면 스타수열 못 만듦
      if (
        (a[idx] !== Number(k) && a[idx + 1] !== Number(k)) ||
        a[idx] === a[idx + 1]
      ) {
        idx += 1;
        continue;
      }

      // 스타수열의 한 쌍을 찾음
      cnt += 1;
      idx += 2;
    }

    // 최대값 갱신
    answer = Math.max(cnt, answer);
  }

  return answer === -1 ? -1 : answer * 2;
}

// 테스트
console.log(solution([0])); // -1
console.log(solution([5, 2, 3, 3, 5, 3])); // 4
console.log(solution([0, 3, 3, 0, 7, 2, 0, 2, 2, 0])); // 8

/**
 * 문제 해결 방법:
 * 1. 배열의 각 원소의 등장 횟수를 카운트
 * 2. 각 고유한 값을 공통 원소로 하는 스타수열 시도
 * 3. 각 시도마다:
 *    - 연속된 두 원소를 검사
 *    - 두 원소 중 하나는 반드시 현재 검사중인 값(k)이어야 함
 *    - 두 원소는 서로 달라야 함
 * 4. 가능한 최대 스타수열의 길이 반환
 *
 * 시간복잡도: O(N*K) - N은 배열 길이, K는 고유한 값의 개수
 * 공간복잡도: O(K) - 카운터 객체 저장용
 */
