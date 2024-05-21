const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");
const N = Number(input[0])

const dfs = (list) => {
  if (list.length === N) {
    console.log(list.join(" "))
  } else {

    for(let i = 1; i < N + 1; i++) {
      if(!list.includes(i)) {
        dfs([...list, i])
      }
    }
  }
}

dfs([])