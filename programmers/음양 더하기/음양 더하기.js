function solution(absolutes, signs) {
  return absolutes
          .map((number, idx) => signs[idx] ? number : number - (number * 2))
          .reduce((acc, curr) => acc + curr)
}