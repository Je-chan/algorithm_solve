const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const arrayGroup = input.slice(1).map((arr) => arr.split(" ").map(Number));
const [sortedA, sortedB] = arrayGroup.map((arr, idx) =>
  arr.sort((before, after) => (idx === 0 ? after - before : before - after))
);

const properMap = new Map();

sortedB.forEach((el, idx) => {
  if (!properMap.get(el)) {
    properMap.set(el, [sortedA[idx]]);
  } else {
    properMap.set(el, [...properMap.get(el), sortedA[idx]]);
  }
});

const test = sortedB.reduce((acc, cur, idx) => {
  return acc + cur * sortedA[idx];
});

console.log(test);

console.log(properMap);
