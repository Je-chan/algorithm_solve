function solution(participant, completion) {
  const participantObj = participant.reduce((acc, cur) => {
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
    return acc;
  }, {});

  completion.forEach((name) => {
    if (participantObj[name] === 1) {
      delete participantObj[name];
    } else {
      participantObj[name] -= 1;
    }
  });

  return Object.keys(participantObj)[0];
}

console.log(solution(["leo", "kiki", "eden"], ["eden", "kiki"])); // "leo"
console.log(
  solution(
    ["marina", "josipa", "nikola", "vinko", "filipa"],
    ["josipa", "filipa", "marina", "nikola"],
  ),
); // "vinko"
console.log(
  solution(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"]),
); // "mislav"