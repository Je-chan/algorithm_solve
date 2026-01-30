class MinHeap {
	constructor() {
		this.heap = [];
		this.compareFn = (a, b) => a[0] - b[0];
	}

	get size() {
		return this.heap.length;
	}

	push(node) {
		this.heap.push(node);
		this._bubbleUp(this.heap.length - 1);
	}

	pop() {
		if (this.heap.length === 0) return null;
		if (this.heap.length === 1) return this.heap.pop();

		const top = this.heap[0];
		this.heap[0] = this.heap.pop();
		this._bubbleDown(0);
		return top;
	}

	_swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}

	_parent(i) {
		return Math.floor((i - 1) / 2);
	}

	_bubbleUp(i) {
		while (i > 0) {
			const parentIdx = this._parent(i);
			if (this.compareFn(this.heap[parentIdx], this.heap[i]) > 0) {
				this._swap(i, parentIdx);
				i = parentIdx;
			} else {
				break;
			}
		}
	}

	_children(i) {
		return [2 * i + 1, 2 * i + 2];
	}

	_bubbleDown(i) {
		const n = this.heap.length;

		while (true) {
			let target = i;
			const [leftIdx, rightIdx] = this._children(i);

			if (
				leftIdx < n &&
				this.compareFn(this.heap[leftIdx], this.heap[target]) < 0
			) {
				target = leftIdx;
			}

			if (
				rightIdx < n &&
				this.compareFn(this.heap[rightIdx], this.heap[target]) < 0
			) {
				target = rightIdx;
			}

			if (target === i) {
				break;
			}

			this._swap(i, target);
			i = target;
		}
	}
}

function dijkstra(graph, start, n) {
	// ---------------------------------------------------------
	// graph  : 인접 리스트 형태의 그래프
	//          graph[u] = [[v1, w1], [v2, w2], ...]
	//          → u에서 v로 가는 비용이 w
	//
	// start  : 시작 노드 번호
	//
	// n      : 전체 노드 개수
	//
	// 목표:
	//   start 노드에서 모든 노드까지의 "최소 거리"를 구한다.
	// ---------------------------------------------------------

	// 1. 거리 배열 생성
	// dist[i] = start → i 까지의 최소 거리
	// 처음에는 모두 "모른다"는 의미로 Infinity로 설정
	const dist = Array(n + 1).fill(Infinity);

	// 2. 최소 힙 준비
	// 힙에는 [현재까지의 거리, 현재 노드 번호] 형태로 저장한다.
	// 항상 "거리 기준으로 가장 작은 값"이 먼저 나오도록 한다.
	const heap = new MinHeap();

	// 3. 시작점 초기화
	// 시작점에서 시작점까지의 거리는 0
	dist[start] = 0;

	// 힙에 시작 상태 삽입
	// 의미: "start 노드에 있고, 현재까지의 거리 0"
	heap.push([0, start]);

	// 4. 힙이 빌 때까지 반복
	// 힙에는 "아직 확정되지 않은 후보 경로"들이 들어 있다.
	while (heap.size > 0) {
		// 4-1 현재 가장 짧은 거리의 노드를 꺼낸다.
		// MinHeap이므로 항상 "가장 거리 짧은 것"이 나온다.
		const [currentDist, node] = heap.pop();

		// 4-2 만약 이미 더 짧은 거리로 처리된 적이 있다면 무시
		// 왜 필요할까?
		// 같은 노드가 힙에 여러 번 들어갈 수 있기 때문이다.
		// (더 좋은 경로가 발견될 때마다 push되기 때문)
		//
		// currentDist가 최신 dist[node]보다 크다면
		// 이미 더 좋은 경로가 있다는 뜻 → 스킵
		if (currentDist > dist[node]) continue;

		// 4-3 현재 노드와 연결된 모든 인접 노드 탐색
		// graph[node] = [[next1, weight1], [next2, weight2], ...]
		for (const [next, weight] of graph[node]) {
			// 4-4 현재 노드를 거쳐 next로 가는 거리 계산
			const newDist = currentDist + weight;

			// 4-5 만약 더 짧은 경로를 발견했다면 갱신
			if (newDist < dist[next]) {
				// 거리 갱신
				dist[next] = newDist;

				// 힙에 새로운 후보 경로 추가
				// 의미:
				// "next 노드에 newDist 비용으로 도달 가능"
				heap.push([newDist, next]);
			}
		}
	}

	// 5 최종적으로 start에서 모든 노드까지의 최소 거리 반환
	return dist;
}
