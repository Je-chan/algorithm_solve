function solution(n, lost, reserve) {
  let count = n - lost.length 
  
  let haveNo = []
  
  for (let i = 0 ; i < lost.length ; i++) {
      if(reserve.includes(lost[i])) {
          reserve = reserve.filter(el => el !== lost[i])
          count++
      } else {
          haveNo.push(lost[i])
      }
  }
  
  for (let i = 0 ; i < haveNo.length ; i++) {
      if(reserve.includes(lost[i] - 1)) {
          reserve = reserve.filter(el => el !== lost[i] - 1)
          count++
      } else if(reserve.includes(lost[i] + 1)) {
          reserve = reserve.filter(el => el !== lost[i] + 1)
          count++
      }
  }
  
  return count
}