function solution(id_list, report, k) {
  const idIndex = {}
	const userReportedList = {}

	for(let i = 0 ; i < id_list.length ; i++) {
		const userId = id_list[i]
		userReportedList[userId] = []
		idIndex[userId] = i
	}

	for(const twoUser of report) {
		const [reporter, reported] = twoUser.split(' ')
		
		if(userReportedList[reported].includes(reporter)) continue

		userReportedList[reported].push(reporter)
	}

	const userGetMsgCount = new Array(id_list.length).fill(0)

	for(let i = 0 ; i < id_list.length ; i++) {
		const userId = id_list[i]
		if(userReportedList[userId].length >= k) {
			for(const reporter of userReportedList[userId]) userGetMsgCount[idIndex[reporter]]++
		}
	}

	return userGetMsgCount
}
