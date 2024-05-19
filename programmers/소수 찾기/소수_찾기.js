function solution(numbers) {
  var answer = [];
  let numArr = numbers.split('');
  // 소수인지 판별하는 isPrime 함수
  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };
  // arr의 요소들로 숫자를 만들고 중복되지 않는 소수이면 answer에 push
  const recur = function (arr, str) {
    for (let i = 0; i < arr.length; i++) {
      let newArr = [...arr];
      let newStr = str + arr[i];
      if (newStr[0] === '0') continue;
      if (isPrime(Number(newStr)) && !answer.includes(newStr)) {
        answer.push(newStr);
      }
      newArr.splice(i, 1);
      recur(newArr, newStr);
    }
  };

  recur(numArr, '');
  return answer.length;
}
