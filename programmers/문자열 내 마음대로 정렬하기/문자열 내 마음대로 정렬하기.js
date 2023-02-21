function solution(strings, n) {
	return strings.sort((acc, curr) => {
    if(acc[n] > curr[n]) return 1
    else if(acc[n] < curr[n]) return -1
    else {
      if(acc >= curr) return 1
      else return -1
    }
  })
}