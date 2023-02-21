function solution(N, stages) {
	let leftCount = stages.length
	const failRate = new Map()

	for(let i = 1 ; i <= N ; i++) {
		let failCount = 0
		stages.forEach((failStage) => {
			if(failStage === i) failCount++
		})
		
		failRate.set(
			i,
			failCount / leftCount
		) 
		leftCount -= failCount
	}

	return [...failRate].sort((f, s ) => s[1] - f[1]).flatMap(data => data[0])
}

