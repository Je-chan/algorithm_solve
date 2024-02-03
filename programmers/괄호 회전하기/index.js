const PROPER_BRACKET = new Map([
  [")", "("],
  ["}", "{"],
  ["]", "["],
]);

function solution(s) {
  // (1) s 를 회전
  let answer = 0;

  for (let i = 0; i < s.length; i++) {
    const newS = s.slice(i) + s.slice(0, i);

    const stack = [];
    for (let j = 0; j < newS.length; j++) {
      if (stack.length === 0) {
        stack.push(newS[j]);
      } else if (
        PROPER_BRACKET.has(newS[j]) &&
        stack[stack.length - 1] === PROPER_BRACKET.get(newS[j])
      ) {
        stack.pop();
      } else {
        stack.push(newS[j]);
      }
    }

    if (stack.length === 0) {
      answer++;
    }
  }

  return answer;
}

console.log(solution("[](){}")); // 3
console.log(solution("}]()[{")); // 2
console.log(solution("[)(]")); // 0
console.log(solution("}}}")); // 0