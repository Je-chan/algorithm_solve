function solution(n) {
  // toString(3): 3진법으로 전환
  // .split('').reverse().join('') 으로 순서 뒤바꾸기
  // parseInt(수, 3): 을 통해서 3진법인 수를 10진법으로 전환
  return parseInt(n.toString(3).split('').reverse().join(''), 3);
}
