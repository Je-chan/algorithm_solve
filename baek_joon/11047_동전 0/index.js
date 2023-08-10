const fs = require('fs');

const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

let targetMoney = input[0].split(' ')[1];

const coinList = input.slice(1).reverse().map(Number);

const coinObj = {};
for (let i = 0; i < coinList.length; i++) {
  const coin = coinList[i];
  const coinCount = parseInt(targetMoney / coin);
  if (coinCount > 0) {
    coinObj[String(coin)] = coinCount;
    targetMoney = targetMoney % (coin * coinCount);
  }
}

console.log(Object.values(coinObj).reduce((acc, cur) => acc + cur, 0));
