// 과제는 시작하기로 한 시각이 되면 시작한다
// 새로운 과제를 시작할 시간이 됐을 때 기존 진행중이던 과제가 있으면 진행중이던 과제를 멈추고 새로운 과제를 시작한다
// 진행중이던 과제를 끝냈을 때 잠시 멈춘 과제가 있다면, 멈춘 과제를 이어서 진행한다. => 과제를 끝낸 시각에 새로 시작해야하는 과제와 잠시 멈춘과제가 있다면 새로운 것 먼저
// >> 새로운 것을 가장 먼저 시작해야 한다.
// 멈춘 과제가 여러 개라면 가장 최근 멈춘 것부터 시작해야 한다.

// 우선순위
// 1. 새로 시작해야 하는 과제
// 2. 멈춘 과제 중 가장 최근에 멈춘 것(Fist In Last Out)

function solution(plans) {
  let pausedWorkList = [];
  const finishedWorkList = [];

  // (1) 시간 계산을 편하게 하기 위해 분단위로 파싱
  const parsedPlans = plans
    .map((plan) => [
      plan[0],
      // (1-1) 시작 시간을 분으로 바꾸고 number 타입으로 바꿈
      plan[1].split(":").reduce((acc, cur, idx) => {
        return acc + (idx === 0 ? Number(cur) * 60 : Number(cur));
      }, 0),
      // (1-2) 걸리는 시간을 number 타입으로 바꿈
      Number(plan[2]),
    ])
    .sort((before, after) => before[1] - after[1]);

  // (2) 작업 시간 게산
  for (let i = 0; i < parsedPlans.length; i++) {
    // (2-1) 만약 마지막 작업이라면 다른 거 계산할 필요 없이 바로 finished
    if (i === parsedPlans.length - 1) {
      finishedWorkList.push(parsedPlans[i][0]);
      break;
    }

    const [currentWorkName, currentWorkStartAt, currentWorkTime] =
      parsedPlans[i];
    const [nextWorkName, nextWorkStartAt, nextWorkTime] = parsedPlans[i + 1];

    const currentWorkEndAt = currentWorkStartAt + currentWorkTime;

    // (2-1) 현재 일감을 마무리하는 시간이 다음 일감 시작 시간보다 늦다면: 잠시 멈춤
    if (currentWorkEndAt > nextWorkStartAt) {
      pausedWorkList.push([
        currentWorkName,
        null,
        currentWorkEndAt - nextWorkStartAt,
      ]);
    }

    // (2-2) 현재 일감을 마무리 하는 시간이 다음 일감 시작 시간보다 더 일찍 마무리 된다면: 다음 작업도 진행해야 함
    else {
      finishedWorkList.push(currentWorkName);
      let restTime = nextWorkStartAt - currentWorkEndAt;

      while (restTime > 0 && pausedWorkList.length > 0) {
        const pausedWork = pausedWorkList.pop();
        // (2-2-1) 만약 현재 일처리해야 할 작업이 남은 시간보다 더 오래 걸리면, 작업 시간 - 남은 시간
        if (restTime < pausedWork[2]) {
          pausedWorkList.push([pausedWork[0], null, pausedWork[2] - restTime]);
          restTime = 0;
        }
        // (2-2-2) 현재 일처리해야할 작업이 남은 시간보다 짧다면
        else {
          finishedWorkList.push(pausedWork[0]);
          restTime -= pausedWork[2];
        }
      }
    }
  }

  return finishedWorkList.concat(
    pausedWorkList.reverse().map((work) => work[0]),
  );
}
//
// console.log(
//   solution([
//     ["korean", "11:40", "30"],
//     ["english", "12:10", "20"],
//     ["math", "12:30", "40"],
//   ]),
// );
console.log(
  solution([
    ["science", "12:40", "50"],
    ["music", "12:20", "40"],
    ["history", "14:00", "30"],
    ["computer", "12:30", "100"],
  ]),
);
// console.log(
//   solution([
//     ["aaa", "12:00", "20"],
//     ["bbb", "12:10", "30"],
//     ["ccc", "12:40", "10"],
//   ]),
// );
