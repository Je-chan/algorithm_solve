function solution(s) {
  const stack = [];

  for (const alphabet of s) {
    const lastChar = stack[stack.length - 1];

    if (alphabet === lastChar) {
      stack.pop();
    } else {
      stack.push(alphabet);
    }
  }

  return stack.length === 0 ? 1 : 0;
}

console.log(solution("baabaa")); // 1
console.log(solution("cdcd")); // 0