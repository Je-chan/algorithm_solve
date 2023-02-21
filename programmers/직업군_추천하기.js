function solution(table, languages, preference) {
  var answer = '';

      // table에 있는 문자열 내용을 띄어쓰기를 기준으로 배열로 바꾼다
  let newTable = table.map(el => el.split(' '))
      // 배열들을 알파벳순으로 정렬한다 (사전 순으로 먼저 오는 값을 간편하게 뽑아주기 위함)
  newTable.sort() 

      // 새로운 객체를 생성후 languages의 내용과 preference의 내용을 key: value 의 형식으로 만든다
  let preferObj = {}
  languages.map((el, i) => preferObj[el] = preference[i])

      // scores는 ['직업군', 총점] 으로 만들 예정이며, 이후 정렬을 위해 객체 아닌 배열로 사용
  let scores = []

      // 각 직업군 탐색
  for (let el of newTable) {
          // reduce로 총점을 구함
      let score = el.reduce((acc, cur, i) => {
          return cur in preferObj ? acc + ((6-i) * preferObj[cur]) : acc + 0
      }, 0)
          // scores에 ['직업군', 총점]으로 push
      scores.push([el[0], score])
  }

      // 이제 점수별로 정리 scores 정리
  scores.sort((s, f) => s[1] > f[1] ? -1 : 1)
      // scores 맨 첫 번째 요소인 배열의 첫 번째 요소가 원하는 직업군
  answer = scores[0][0]

  return answer

}  
