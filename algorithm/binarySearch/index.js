// 이진 탐색
function binarySearch(arr, target, start, end) {
  // 찾지 못했을 경우 (데이터가 존재하지 않는다)
  if (start > end) return -1;
  let mid = parseInt((start + end) / 2);

  // 찾은 경우 중간점 인덱스 반환
  if (arr[mid] === target) return mid;
  // 중간점의 값보다 찾고자 하는 값이 더 작은 경우 mid 기준 왼쪽으로 Search
  else if (arr[mid] > target) return binarySearch(arr, target, start, mid - 1);
  // 중간점의 값보다 찾고자 하는 값이 더 큰 경우 mid 기준 오른쪽으로 Search
  else return binarySearch(arr, target, mid + 1, end);
}

function binarySearchFor(arr, target, start, end) {
  // 탐색 범위가 존재하는 경우.
  while (start <= end) {
    let mid = parseInt((start + end) / 2);

    // 찾은 경우 중간점 인덱스 반환
    if (arr[mid] === target) return mid;
    // 중간점의 값보다 찾고자 하는 값이 작은 경우 mid 기준 왼쪽으로 Search
    else if (arr[mid] > target) end = mid - 1;
    // 중간점의 값보다 찾고자 하는 값이 큰 경우 mid 기준 오른쪽으로 Search
    else start = mid + 1;
  }

  // 찾지 못했을 경우 (데이터가 존재하지 않는다)
  return -1;
}
