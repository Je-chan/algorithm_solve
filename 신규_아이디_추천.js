function solution(new_id) {
  // TODO 1. 소문자로 치환
  const lower_id = new_id.toLowerCase();

  const replaced_id = lowerid
    // TODO 2. 소문자, 숫자, 빼기, 밑줄, 마침표 제외한 모든 문자 제거
    .replace(/[^\w-.]/g, '')
    // [ ] => 문자의 범위 구간 지정. 여기서는 이스케이프 문자를 쓰지 않아도 된다.
    // 즉, - 는 구간 설정, .은 임의의 한 문자를 의미하는데 있는 그대로의 문자 -, . 를 쓰기 위해 이스케이프 하지 않아도 된다는 뜻
    // ^ => 문자의 시작
    // \w => 63개의 문자(영문 대소문자 52개, 숫자 10개, _ 에 일치)
    // TODO 3. 마침표가 두 번 이상 나온 경우, 마침표 하나로 치환
    .replace(/.{2,}/g, '.')
    // '.' 이 아닌 '.' 을 해준 이유는 정규 표현식에서 '.' 아 임의의 한 문자를 의미하기 때문
    // {} => 연속 일치 {2} 라면 두 개 연속 일치, {2,}라면 두 개 이상 연속 일치

    // TODO 4. 마침표가 처음이나 끝에 위치한다면 제거
    .replace(/^.|.$/g, '')
    // | => or 의 의미
    // ^는 문자열의 시작, $ 는 문자열의 마지막

    // TODO 5. new_id 가 빈 문자열이라면 new_id 에 'a'를 대입
    .replace(/^$/, 'a')
    // /^$/ 는 문자열의 시작과 끝이 똑같다는 얘기이므로 빈 문자열임을 의미함

    // TODO 6-1. new_id 길이가 16자 이상일 때, new_id 첫 15개의 문자 제외한 나머지 문자 모두 제거
    .slice(0, 15)
    // TODO 6-2. 만약 제거한 후에 마침표가 new_id 끝에 위치하면 마침표 문자를 제거
    .replace(/.$/, '');

  // TODO 7. new_id 길이가 2자 이하라면, new_id 마지막 문자를 new_id 길이가 3이 될 때까지 반복

  return replaced_id.length < 3
    ? replaced_id +
        replaced_id[replaced_id.length - 1].repeat(3 - replaced_id.length)
    : replaced_id;
}
