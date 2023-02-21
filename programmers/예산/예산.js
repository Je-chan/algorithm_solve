function solution(d, budget) {
  d.sort((acc, curr) => acc - curr)
    
  while(d.reduce((acc, curr) => (acc+ curr), 0) > budget) {
    d.pop()
  }
  return d.length
}