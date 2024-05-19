function solution(orders, course) {
  var answer = [];
  let composition = {};
  let bestOptions = {};

  course.map((el) => (bestOptions[el] = 0));

  function getCombinations(ordersForOne, courseSize) {
    ordersForOne.sort();
    const orderCombination = [];
    if (courseSize === 1) return ordersForOne.map((value) => [value]);

    ordersForOne.forEach((fixed, index, origin) => {
      const rest = origin.slice(index + 1);
      const combinations = getCombinations(rest, courseSize - 1);
      const attached = combinations.map((combinations) =>
        [fixed, ...combinations].join('')
      );

      orderCombination.push(...attached);
    });
    return orderCombination;
  }

  for (let i = 0; i < orders.length; i++) {
    let ordersForOne = orders[i].split('');

    for (let j = 0; j < course.length; j++) {
      let courseSize = course[j];

      if (ordersForOne.length < courseSize) break;

      const orderCombination = getCombinations(ordersForOne, courseSize);

      orderCombination.forEach((el) => {
        let bestOption = bestOptions[courseSize];
        if (Object.keys(composition).includes(el)) {
          composition[el]++;
          if (bestOption < composition[el])
            bestOptions[courseSize] = composition[el];
        } else {
          composition[el] = 1;
        }
      });
    }
  }

  for (let key in composition) {
    const len = key.length;
    if (composition[key] === bestOptions[len]) answer.push(key);
  }

  answer = answer.sort();

  return answer;
}
