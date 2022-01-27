function solution(s) {
  // 저는 처음에 객체를 썼는데 효율성이 뭘 해도 잘 안 나와서 배열로 갈아탔습니다.
  // 효율성을 올리기 위한 코드
  if (s.length % 2 === 1 || s.length === 0) return false;

  let arr = [];

  // ( 나오면 넣고, ) 나오면 빼고
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') arr.push(1);
    else if (s[i] === ')') {
      // ) 를 빼야 하는데 아무것도 없다? => ) 과다 사용
      if (arr.length === 0) return false;
      arr.pop();
    }
  }

  // 다 돌았는데 배열에 요소가 남았다? => ( 과다 사용
  return arr.length === 0;
}
