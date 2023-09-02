const fs = require("fs");

const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const changeList = input.slice(1).map(Number);

const minimizeChangeCoin = (change) => {
  let remainedChange = change;

  let coinList = [
    [25, 0],
    [10, 0],
    [5, 0],
    [1, 0],
  ];
  let currentCoinIdx = 0;
  while (!(remainedChange === 0 || currentCoinIdx === coinList.length)) {
    const [coinValue] = coinList[currentCoinIdx];

    coinList[currentCoinIdx][1] = Math.floor(remainedChange / coinValue);
    remainedChange = remainedChange % coinValue;

    currentCoinIdx++;
  }

  return coinList.map((coinInfo) => coinInfo[1]).join(" ");
};

console.log(
  changeList.reduce((acc, cur) => {
    return acc + minimizeChangeCoin(cur) + "\n";
  }, "")
);
