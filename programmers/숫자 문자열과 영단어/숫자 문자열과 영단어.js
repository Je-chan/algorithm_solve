function solution(s) {
	const numberWord = {
		"zero" : 0,
		"one" : 1,
		"two" : 2,
		"three" : 3,
		"four" : 4,
		"five" : 5,
		"six" : 6,
		"seven" : 7,
		"eight" : 8,
		"nine" : 9
	}

	let stringTypeNumber = ""
	let stringNameNumber = ""

	for(let i = 0 ; i < s.length ; i++) {
		console.log(s[i])
		if(!isNaN(Number(s[i]))) {
			stringTypeNumber += s[i]
		} else {
			stringNameNumber += s[i]
			if(typeof numberWord[stringNameNumber] === "number") {
				stringTypeNumber += numberWord[stringNameNumber]
				stringNameNumber = ""
			}
		}
	}

	return Number(stringTypeNumber)
}