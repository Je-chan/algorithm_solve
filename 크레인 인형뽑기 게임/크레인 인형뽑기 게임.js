function solution(board, moves) {
  
  const bascket = []
  
  let bombDollCount = 0
  
  for(const column of moves) {
    for(const row of board) {
      const doll = row[column - 1]
      if(doll === 0) continue
      
      if(bascket[bascket.length - 1] === doll) {
        bascket.pop()
        bombDollCount += 2
      }
      
      else bascket.push(doll)
      
      row[column -1] = 0
      break
    }
  }
  
  return bombDollCount
    
}