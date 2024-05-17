const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const distanceList = input[1].split(" ").map(Number);
const costList = input[2]
  .split(" ")
  .map(Number)
  .filter((_, idx, arr) => idx !== arr.length - 1);

const { money } = costList.reduce(
  (acc, cur, idx) => {
    if (acc.cost > cur) {
      return {
        cost: cur,
        money: BigInt(acc.money) + BigInt(cur * distanceList[idx]),
      };
    } else {
      return {
        cost: acc.cost,
        money: BigInt(acc.money) + BigInt(acc.cost * distanceList[idx]),
      };
    }
  },
  {
    cost: 1000000001,
    money: 0,
  },
);

console.log(String(money));
