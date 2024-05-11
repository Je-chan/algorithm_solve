const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const K = Number(input[0].split(" ")[1]);
const coinList = input.slice(1).map(Number).reverse();

let restMoney = K;
let coinCount = 0;

for (const coin of coinList) {
  if (restMoney === 0) break;

  const maxCoin = (restMoney - (restMoney % coin)) / coin;
  coinCount += maxCoin;
  restMoney = restMoney % coin;
}

console.log(coinCount);
