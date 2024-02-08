function solution(want, number, discount) {
  const wantMap = want.reduce((acc, cur, idx) => {
    acc.set(cur, number[idx]);
    return acc;
  }, new Map());

  let answer = 0;

  for (let i = 0; i < discount.length; i++) {
    const tenDays = i + 10 < discount.length ? i + 10 : discount.length;
    const copiedMap = new Map(wantMap);

    for (let j = i; j < tenDays; j++) {
      const current = discount[j];
      if (copiedMap.has(current)) {
        const currentCount = copiedMap.get(current);
        if (currentCount === 1) {
          copiedMap.delete(current);
        } else {
          copiedMap.set(current, currentCount - 1);
        }
      }

      if (copiedMap.size === 0) {
        answer++;
      }
    }
  }

  return answer;
}

console.log(
  solution(
    ["banana", "apple", "rice", "pork", "pot"],
    [3, 2, 2, 2, 1],
    [
      "chicken",
      "apple",
      "apple",
      "banana",
      "rice",
      "apple",
      "pork",
      "banana",
      "pork",
      "rice",
      "pot",
      "banana",
      "apple",
      "banana",
    ],
  ),
);

console.log(
  solution(
    ["apple"],
    [10],
    [
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
      "banana",
    ],
  ),
);
