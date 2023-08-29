const fs = require('fs');
const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const testInfo = input.slice(1);
const testCaseList = [];

for (let i = 0; i < testInfo.length; i++) {
  if (testInfo[i].split(' ').length === 1) {
    const personCount = Number(testInfo[i]);
    testCaseList.push(
      testInfo
        .slice(i + 1, i + personCount + 1)
        .map((el) => el.split(' ').map(Number))
        .sort((before, after) => after[0] - before[0])
    );
  }
}

for (const testCase of testCaseList) {
  let possible = 1;
  for (let i = 0; i < testCase.length - 1; i++) {
    let impossible = false;

    for (let j = i + 1; j < testCase.length; j++) {
      if (testCase[i][1] > testCase[j][1]) {
        impossible = true;
        break;
      }
    }

    if (!impossible) possible++;
  }

  console.log(possible);
}
