export class Queue {
  items = [];
  front = 0;
  rear = 0;

  push(item) {
    this.items[this.rear] = item;
    this.rear++;
  }

  pop() {
    return this.items[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}
