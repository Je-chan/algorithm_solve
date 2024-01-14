function solution(arr1, arr2) {
	const answer = Array.from({length: arr1.length}, () => Array.from({length: arr2[0].length}, () => 0));
	
	for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr2.length; j++) {
			for (let k = 0; k < arr2[0].length; k++) {
				answer[i][k] += arr1[i][j] * arr2[j][k];
			}
		}
	}

	return answer
}

console.log(solution([[1, 4], [3, 2], [4, 1]], [[3, 3], [3, 3]])); // [[15, 15], [15, 15], [15, 15]]
console.log(solution([[2, 3, 2], [4, 2, 4], [3, 1, 4]], [[5, 4, 3], [2, 4, 1], [3, 1, 1]])); // [[22, 22, 11], [36, 28, 18], [29, 20, 14]]