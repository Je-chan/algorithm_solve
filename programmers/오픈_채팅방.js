function solution(record) {
  const users = {};
  const notice = [];

  for (let el of record) {
    const info = el.split(" ");
    const EorL = info[0];
    const userId = info[1];
    const user = info[2];
    if (user) users[userId] = user;
    if (EorL !== "Change") notice.push([EorL, userId]);
  }

  return notice.map(
    (el) =>
      `${users[el[1]]}${
        el[0] === "Enter" ? "님이 들어왔습니다." : "님이 나갔습니다."
      }`
  );
}
