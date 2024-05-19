function solution(clothes) {
  let category = {};

  for (let el of clothes) {
    if (category.hasOwnProperty(el[1])) category[el[1]]++;
    else category[el[1]] = 1;
  }

  return (
    Object.values(category).reduce((acc, cur) => {
      return acc * (cur + 1);
    }, 1) - 1
  );
}
