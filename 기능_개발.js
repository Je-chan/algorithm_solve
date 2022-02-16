 function solution(progresses, speeds) {
  var answer = [];

  // 기능을 해결해서 배포하기 위해 며칠이 걸리는 지를 계산함
  // 100%가 완료일이므로 (100% - 현재 진행률) / 작업 진행률  => 소숫점으로 나오면 올림
  let takesAbout = progresses.map((el, i) => Math.ceil( (100 - el) / speeds[i] ))
 
  // 배포까지 오래 걸리는 일을 largest라고 정함. 
  let largest = takesAbout[0]

  // count는 largest 보다 배포가 더 오래 걸리는 일이 발견되기 전까지의 작업 개수를 의미함
  let count = 0

  // 이후 우리는 배포가 더 오래 걸리는 거 찾기 전까지 count를 올리고, 배포가 더 오래 걸리는 걸 찾으면 count에 있는 값을 answer에 올려줄 것

  for (let i = 0 ; i < takesAbout.length ; i++) {
    if(takesAbout[i] > largest) {
      answer.push(count)
      largest = takesAbout[i]
      count = 1

      //  배열의 마지막인데, 가장 배포 오래 걸릴 경우
      if(i === takesAbout.length - 1 && takesAbout[i] === largest) {answer.push(count)}
    }
     // 배열의 마지막인데, 이전 것보다 배포일이 빠를 경우
    else if (i===takesAbout.length-1 && takesAbout[i] <= largest) {
      count++
      answer.push(count)
    }  else {count++} 
  }
  return answer;
}