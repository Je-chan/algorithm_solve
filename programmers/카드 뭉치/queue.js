class Queue {
  items = [];
  front = 0;
  rear = 0;

  constructor(arr) {
    this.items = arr;
    this.rear = arr.length;
  }

  push(item) {
    this.items.push(item);
    this.rear++;
  }

  pop() {
    return this.items[this.front++];
  }

  first() {
    return this.items[this.front];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

const checkQueue = (queue, goal) => {
  if (!queue.isEmpty() && queue.first() === goal.first()) {
    queue.pop();
    goal.pop();
    return true;
  }
  return false;
};

function solution(cards1, cards2, goal) {
  cards1 = new Queue(cards1);
  cards2 = new Queue(cards2);
  goal = new Queue(goal);

  while (!goal.isEmpty()) {
    if (!(checkQueue(cards1, goal) || checkQueue(cards2, goal))) {
      break;
    }
  }

  return goal.isEmpty() ? "YES" : "NO";
}

console.log(
  solution(
    ["i", "drink", "water"],
    ["want", "to"],
    ["i", "want", "to", "drink", "water"],
  ),
); // "YES"

console.log(
  solution(
    ["i", "water", "drink"],
    ["want", "to"],
    ["i", "want", "to", "drink", "water"],
  ),
); // "NO"
