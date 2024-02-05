function solution(progresses, speeds) {
  const answer = [];
  const daysLeft = progresses.map((progress, idx) =>
    Math.ceil((100 - progress) / speeds[idx]),
  );

  let count = 0;
  let maxDay = daysLeft[0];

  daysLeft.forEach((day) => {
    if (day <= maxDay) {
      count++;
    } else {
      answer.push(count);
      count = 1;
      maxDay = day;
    }
  });

  answer.push(count);

  return answer;
}

console.log(solution([93, 30, 55], [1, 30, 5])); // [2, 1]
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1])); // [1, 3, 2]