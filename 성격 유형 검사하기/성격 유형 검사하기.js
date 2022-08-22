function solution(survey, choices) {
  const surveyPoint = {
    R: 0,
    T: 0,
    C: 0,
    F: 0,
    J: 0,
    M: 0,
    A: 0,
    N: 0
  }
  
  survey.forEach((character, idx) => {
    if(choices[idx] === 4) return
    else if(choices[idx] > 4) surveyPoint[`${character[1]}`] += choices[idx] - 4
    else surveyPoint[`${character[0]}`] += 4 - choices[idx]
  })

  return `${surveyPoint.R >= surveyPoint.T ? 'R' : 'T'}${surveyPoint.C >= surveyPoint.F ? 'C' : 'F'}${surveyPoint.J >= surveyPoint.M ? 'J' : 'M'}${surveyPoint.A >= surveyPoint.N ? 'A' : 'N'}`
}