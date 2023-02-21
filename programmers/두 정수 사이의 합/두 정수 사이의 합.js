function solution(a, b) {
	return b >= a 
		? (b * (b+1) / 2) - (a * (a+1) / 2) + a
		: (a * (a+1) / 2) - (b * (b+1) / 2) + b 
}
