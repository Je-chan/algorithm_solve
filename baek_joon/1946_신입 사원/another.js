const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const testList = input
  .map((el) => el.split(" ").map(Number))
  .slice(1)
  .reduce((acc, cur) => {
    if (cur.length === 1) {
      return [...acc, []];
    }

    acc[acc.length - 1].push(cur);
    return acc;
  }, [])
  .map((el) => el.sort((a, b) => a[0] - b[0]));

let max = Number.MAX_SAFE_INTEGER;
let maximumSuccessful = 0;

for (const testCase of testList) {
  for (let i = 0; i < testCase.length; i++) {
    const candidate = testCase[i];
    if (i === 0) {
      maximumSuccessful++;
      max = candidate[1];
    } else if (candidate[1] <= max) {
      maximumSuccessful++;
      max = candidate[1];
    }
  }

  console.log(maximumSuccessful);
  max = Number.MAX_SAFE_INTEGER;
  maximumSuccessful = 0;
}
