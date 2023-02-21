function solution(numbers) {
  const sumResult = []

  for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
          sumResult.push(numbers[i] + numbers[j])
      }
  }

  return [...new Set(sumResult)].sort((a, b) => a - b)
}