function solution(s) {
	const answer = [0, 0]
  let letterList = s

  while(letterList !== '1') {
    answer[0] = answer[0] + 1

    const sliceZero = letterList.split("").filter(letter => {
      if(letter === '0') {
        answer[1] = answer[1] + 1
        return false
      }

      return true
    }).join("")
    
    letterList = sliceZero.length.toString(2)
  }

  return answer
}