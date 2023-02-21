function solution(a, b) {
  const daysForMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const daysForWeek = ['THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED']
  
  let totalDay = 0;
  
  for(let i = 0 ; i < a ; i++) {
    totalDay += daysForMonth[i]  
  }
  
  totalDay += b
  
  return daysForWeek[`${totalDay % 7}`]
}