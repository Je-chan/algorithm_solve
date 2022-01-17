function solution(numbers, target) {
  var answer = 0;

  function calculate(num, i) {
    if (i === numbers.length && num === target) answer++;

    if (i < numbers.length) {
      calculate(num + numbers[i], i + 1);
      calculate(num - numbers[i], i + 1);
    }
  }

  calculate(0, 0);

  return answer;
}
