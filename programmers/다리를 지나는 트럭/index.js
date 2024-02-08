class Bridge {
  constructor(bridge_length, weight) {
    this.length = bridge_length;
    this.weight = weight;
    this.count = 0;
    this.currentWeight = 0;
    this.truckMap = new Map();
  }

  getKey(count, weight) {
    return `${count}_${weight}`;
  }

  getWeightByKey(key) {
    return key.split("_")[1];
  }

  push(truck) {
    this.truckMap.set(this.getKey(this.count, truck), 1);
    this.currentWeight += truck;
  }

  tick() {
    for (const [key, value] of this.truckMap) {
      if (value === this.length) {
        this.truckMap.delete(key);
        this.currentWeight -= this.getWeightByKey(key);
      } else {
        this.truckMap.set(key, value + 1);
      }
    }

    this.count++;
  }

  isLimit(truck) {
    return this.currentWeight + truck > this.weight;
  }

  isEmpty() {
    return this.truckMap.size === 0;
  }

  getCount() {
    return this.count;
  }
}

class TruckQueue {
  constructor(truck_weights) {
    this.truckList = truck_weights;
    this.front = 0;
    this.rear = truck_weights.length;
  }

  getTruck() {
    return this.truckList[this.front];
  }

  pop() {
    return this.truckList[this.front++];
  }

  isEmpty() {
    return this.front === this.rear;
  }
}

function solution(bridge_length, weight, truck_weights) {
  const bridge = new Bridge(bridge_length, weight);
  const truckQueue = new TruckQueue(truck_weights);

  while (!(truckQueue.isEmpty() && bridge.isEmpty())) {
    bridge.tick();

    if (!truckQueue.isEmpty() && !bridge.isLimit(truckQueue.getTruck())) {
      bridge.push(truckQueue.pop());
    }
  }

  return bridge.getCount();
}

console.log(solution(2, 10, [7, 4, 5, 6])); // 8
console.log(solution(100, 100, [10])); // 101
console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10])); // 110