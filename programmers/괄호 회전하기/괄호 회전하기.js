function solution(s) {
  let answer = 0

  const bracketList = {
    "[": {
      type: 'open',
      value: 1
    },
    "]": {
      type: 'close',
      value: 1
    },
    "{": {
      type: 'open',
      value: 2
    },
    "}": {
      type: 'close',
      value: 2
    },
    "(": {
      type: 'open',
      value: 3
    },
    ")": {
      type: 'close',
      value: 3
    },
  }

  const letterList = s.split("")

  for(let i =  0 ; i < letterList.length ; i++) {
    const stackedBracket = []
    for(const bracket of letterList) {
      if(bracketList[`${bracket}`].type === 'close') {
        if(stackedBracket.length === 0) {
          stackedBracket.push(bracket)
          break;
        };

        const lastBracket = stackedBracket[stackedBracket.length - 1]
    
        if( bracketList[`${lastBracket}`].value !== bracketList[`${bracket}`].value) break;
        else stackedBracket.pop();
        
      } else {
        stackedBracket.push(bracket)
      }
    }
    
    if(stackedBracket.length === 0) answer++
    
    letterList.push(letterList.shift())
  }

  return answer
}
