// 1, 1, 1
// 1, 2
// 2, 1
// (1, 2)

// 1, 1, 1, 1
// 1, 1, 2
// 1, 2, 1
// 2, 1, 1
// 2, 2
// (1, 3, 1)
// 5

// 1, 1, 1, 1, 1
// 1, 1, 1, 2
// 1, 1, 2, 1
// 1, 2, 1, 1
// 2, 1, 1, 1
// 1, 2, 2
// 2, 1, 2
// 2, 2, 1
// (1, 4, 3)
// 8

// 1, 1, 1, 1, 1, 1 (1)
// 1, 1, 1, 1, 2(1Cn-1)
// 1, 1, 1, 2, 1
// 1, 1, 2, 1, 1
// 1, 2, 1, 1, 1
// 2, 1, 1, 1, 1
// 1, 1, 2, 2(C
// 1, 2, 1, 2
// 1, 2, 2, 1
// 2, 1, 1, 2
// 2, 1, 2, 1
// 2, 2, 1, 1
// 2, 2, 2
// (1, 5, 6, 1) 13

// 1, 1, 1, 1, 1, 1, 1 => 1개
// 1, 1, 1, 1, 1, 2 => 2가 한개 => n-1 개만큼 존재
// 1, 1, 1, 2, 2
// 1, 1, 2, 1, 2
// 1, 2, 1, 1, 2
// 2, 1, 1, 1, 2
// 1, 2, 1, 2, 1

function solution(n) {
  let fibo = [1, 2];
  for (let i = 2; i < n; i++) {
    fibo.push((fibo[i - 1] + fibo[i - 2]) % 1234567);
  }
  return fibo[n - 1];
}
