function solution(arr, divisor) {
  const answer = arr
    .filter(number => number % divisor === 0)
    .sort((acc, curr) => acc - curr)

  return answer.length > 0 ? answer : [-1]
}
