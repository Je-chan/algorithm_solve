class UnionFind {
	constructor(n) {
		// 부모 배열
		this.parent = Array.from({ length: n + 1 }, (_, i) => i);
		// 트리 높이 관리
		this.rank = Array.from({ length: n + 1 }, () => 0);
		// 집합 개수
		this.count = n;
	}

	/**
	 * Find:  루트 찾기 + 경로 압축
	 * 재귀적으로 루트를 찾으면서 지나느 모든 노드를 루트에 직접 연결
	 * 사실상 O(1) / O(a(N)) 아커만 역함수
	 */
	find(x) {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x]);
		}

		return this.parent[x];
	}

	/**
	 * Union: 두 집합 합치기
	 * 랭크가 낮은 트리를 높은 트리 아래에 붙여서 균형을 유지
	 * 이미 같은 집합이면 false, 합치면 ture
	 */
	union(x, y) {
		const rootX = this.find(x);
		const rootY = this.find(y);

		if (rootX === rootY) return false; // 이미 같은 집합이므로 false

		// 랭크 기반으로 합치기
		if (this.rank[rootX] < this.rank[rootY]) {
			this.parent[rootX] = rootY;
		} else if (this.rank[rootX] > this.rank[rootY]) {
			this.parent[rootY] = rootX;
		} else {
			this.parent[rootY] = rootX;
			this.rank[rootX]++;
		}

		this.count--; // 집합 개수를 감소
		return true;
	}

	isConnected(x, y) {
		return this.find(x) === this.find(y);
	}

	getCount() {
		return this.count;
	}
}

// 가중치 Union Find.
// >> 각 집합의 크기를 추적하는 버전
class WeightedUnionFind {
	constructor(n) {
		this.parent = Array.from({ length: n + 1 }, (_, i) => i);
		this.size = Array.from({ length: n + 1 }, () => 1);
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

		// 작은 쪽을 큰 쪽에 합치기
		if (this.size[rootX] < this.size[rootY]) {
			this.parent[rootX] = rootY;
			this.size[rootY] += this.size[rootX];
		} else {
			this.parent[rootY] = rootX;
			this.size[rootX] += this.size[rootY];
		}

		this.count--;
		return true;
	}
}
