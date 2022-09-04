function solution(price, money, count) {
  let currentMoney = money
  
  for(let i = 1 ; i <= count ; i ++) {
    currentMoney -= price * i
  }
  
	return currentMoney > 0 ? 0 : Math.abs(currentMoney) 
}