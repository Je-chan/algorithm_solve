const deleteItem = () => {};

function solution(n, k, cmd) {
  const deletedStack = [];

  const up = Array.from({ length: n + 2 }).map((_, i) => i - 1);
  const down = Array.from({ length: n + 2 }).map((_, i) => i + 1);

  let current = k + 1;

  console.log(cmd);
  for (const command of cmd) {
    const [type, count] = command.split(" ");
    if (type === "C") {
      deletedStack.push(current);

      up[down[current]] = up[current];
      down[up[current]] = down[current];

      current = n < down[current] ? up[current] : down[current];
    } else if (type === "Z") {
      const restore = deletedStack.pop();
      down[up[restore]] = restore;
      up[down[restore]] = restore;
    } else if (type === "U") {
      for (let i = 0; i < count; i++) {
        current = up[current];
      }
    } else {
      for (let i = 0; i < count; i++) {
        current = down[current];
      }
    }
  }

  const answer = new Array(n).fill("O");
  for (const i of deletedStack) {
    answer[i - 1] = "X";
  }

  return answer.join("");
}

console.log(
  solution(8, 2, ["D 2", "C", "U 3", "C", "D 4", "C", "U 2", "Z", "Z"]),
); // "OOOOXOOO"

console.log(
  solution(8, 2, [
    "D 2",
    "C",
    "U 3",
    "C",
    "D 4",
    "C",
    "U 2",
    "Z",
    "Z",
    "U 1",
    "C",
  ]),
); // "OOXOXOOO"