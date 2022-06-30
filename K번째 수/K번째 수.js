function solution(array, commands) {

  const answer = []

  for (const command of commands) {
    const [start, end, index] = command
    answer.push(array.slice(start - 1, end).sort((before, after) => before - after)[index - 1])
  }

  return answer
}