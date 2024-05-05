// 하한선
// : 정렬된 순서를 유지하면서 배열에 삽입할 가장 왼쪽 인덱스를 반환
function lowerBound(arr, target, start, end) {
  while (start < end) {
    let mid = parseInt((start + end) / 2);
    if (arr[mid] >= target) {
      end = mid; // 최대한 왼쪽으로 이동 (end 를 왼쪽으로 밀어주는 것)
    } else start = mid + 1;
  }

  return end;
}

// 상한선
// : 정렬된 순서를 유지하면서 배열에 삽입할 가장 오른쪽 인덱스를 반환
function upperBound(arr, target, start, end) {
  while (start < end) {
    let mid = parseInt((start + end) / 2);
    if (arr[mid] > target) end = mid;
    else start = mid + 1; // 최대한 오른쪽으로 이동 (start 를 오른쪽으로 밀어주는 것)
  }

  return end;
}

// 특정 원소의 개수
// : 값이 [leftValue, rightValue] 인 데이터의 개수를 반환하는 함수
function countByRange(arr, leftValue, rightValue) {
  let rightIndex = upperBound(arr, rightValue, 0, arr.length);
  let leftIndex = lowerBound(arr, leftValue, 0, arr.length);

  return rightIndex - leftIndex;
}
