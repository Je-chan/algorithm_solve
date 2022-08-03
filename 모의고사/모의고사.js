function solution(answers) {
	const one = [1, 2, 3, 4, 5]
	const two = [2, 1, 2, 3, 2, 4, 2, 5]
	const three = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]

	const correctAnswerCount = {
		one: 0,
		two: 0,
		three: 0
	}

	for(let i = 0 ; i < answers.length ; i++) {
		if(one[i % one.length] === answers[i]) correctAnswerCount['one'] += 1
		if(two[i % two.length] === answers[i]) correctAnswerCount['two'] += 1
		if(three[i % three.length] === answers[i]) correctAnswerCount['three'] += 1
	}

	const maxCount = Object.keys(correctAnswerCount).reduce((acc, curr) => {
		if(acc < correctAnswerCount[`${curr}`]) return correctAnswerCount[`${curr}`]
		else return acc
	}, 0)

	const answerArray = []
	if(correctAnswerCount['one'] === maxCount) answerArray.push(1)
	if(correctAnswerCount['two'] === maxCount) answerArray.push(2)
	if(correctAnswerCount['three'] === maxCount) answerArray.push(3)

	return answerArray
}