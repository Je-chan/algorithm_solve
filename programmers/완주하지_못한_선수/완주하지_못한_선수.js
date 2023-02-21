function solution(participant, completion) {
  // TODO1. 배열을 정렬한다.
  const sortedParticipant = participant.sort();
  const sortedCompletion = completion.sort();

  // TODO2. 정렬된 배열끼리 Index 의 요소를 비교해서 차이나는 값(participant) 을 리턴
  for (let i = 0; i < sortedParticipant.length; i++) {
    if (sortedParticipant[i] !== sortedCompletion[i])
      return sortedParticipant[i];
  }
}
