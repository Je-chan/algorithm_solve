const fs = require('fs');

// 백준에 제출할 때는 readFileSync 를 아래와 같이 맞춰야 함.
// const input = fs.readFileSync(0, 'utf-8').toString().trim().split('\n');
const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');

const [n, m] = input[0].split(' ').map(Number);

class UnionFind {
	constructor(n) {
		this.parent = Array.from({ length: n + 1 }, (_, i) => i);
		this.rank = Array.from({ length: n + 1 }, () => 0);
		this.count = n;
	}

	find(x) {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x]);
		}
		return this.parent[x];
	}

	union(x, y) {
		const rootX = this.find(x);
		const rootY = this.find(y);

		if (rootX === rootY) return false;

		if (this.rank[rootX] < this.rank[rootY]) {
			this.parent[rootX] = rootY;
		} else if (this.rank[rootX] > this.rank[rootY]) {
			this.parent[rootY] = rootX;
		} else {
			this.parent[rootY] = rootX;
			this.rank[rootX]++;
		}

		this.count--;
		return true;
	}

	isConnected(x, y) {
		return this.find(x) === this.find(y);
	}
}

const uf = new UnionFind(n);

for (let i = 1; i < input.length; i++) {
	const [flag, a, b] = input[i].split(' ').map(Number);

	if (flag === 0) {
		uf.union(a, b);
	}

	if (flag === 1) {
		console.log(uf.isConnected(a, b) ? 'YES' : 'NO');
	}
}
