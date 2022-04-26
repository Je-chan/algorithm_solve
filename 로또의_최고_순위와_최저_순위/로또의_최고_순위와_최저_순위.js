function solution(lottos, win_nums) {
  const {zeroCount, correctCount} = checkCorrectAndZeroCount(lottos, win_nums);
  const maxCorrect = correctCount + zeroCount
  const minCorrect = correctCount

  return [rank(maxCorrect), rank(minCorrect)]
}

const checkCorrectAndZeroCount = (lottos, win_nums) => {
  let zeroCount = 0;
  let correctCount = 0;
  
  for(let lotto of lottos) {
    if(lotto === 0) {
      zeroCount++
      continue
    }
    if(win_nums.includes(lotto)) correctCount++ 
  }

  return {zeroCount, correctCount}
} 

const rank = (score) => {
  if(score > 1) return 7 - score
  else if(score === 0 || score === 1) return 6
}