function solution(record) {
  const WORD = {
    Enter: "님이 들어왔습니다.",
    Leave: "님이 나갔습니다.",
  };

  const userMap = new Map();
  const operationList = [];

  for (const command of record) {
    const [action, uid, nickname] = command.split(" ");

    if (action === "Enter") {
      userMap.set(uid, nickname);
    }

    if (action === "Change") {
      userMap.set(uid, nickname);
    } else {
      operationList.push([action, uid]);
    }
  }

  return operationList.map(
    (operation) => `${userMap.get(operation[1])}${WORD[operation[0]]}`,
  );
}

console.log(
  solution([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Leave uid1234",
    "Enter uid1234 Prodo",
    "Change uid4567 Ryan",
  ]),
); // ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]

console.log(
  solution([
    "Enter uid1234 Muzi",
    "Enter uid4567 Prodo",
    "Enter uid1234 Prodo",
  ]),
); // ["Prodo님이 들어왔습니다.", "Prodo님이 들어왔습니다."]