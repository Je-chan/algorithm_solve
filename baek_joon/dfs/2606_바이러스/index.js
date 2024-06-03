const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const computerCount = parseInt(input[0]);
const networkList = input.slice(2);

const network = new Array(computerCount + 1).fill(null).map(() => []);

for (const linkInfo of networkList) {
  const [first, second] = linkInfo.split(" ").map(Number);

  network[first].push(second);
  network[second].push(first);
}

const visited = new Array(computerCount).fill(false);

let virusComputerCount = 0;

const dfs = (network, computer, visited) => {
  visited[computer] = true;

  virusComputerCount++;

  for (const linkedComputer of network[computer]) {
    if (!visited[linkedComputer]) {
      dfs(network, linkedComputer, visited);
    }
  }
};

dfs(network, 1, visited);

console.log(virusComputerCount - 1);
