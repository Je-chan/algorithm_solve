function solution(arr) {
	const minValue = arr.reduce((acc, curr) => Math.min(acc, curr))
  const arrExceptMin = arr.filter(element => element !== minValue)
	return arrExceptMin.length > 0 ? arrExceptMin : [-1]
}