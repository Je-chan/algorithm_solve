const fs = require("fs");
const input = fs.readFileSync("../dev/stdin").toString().trim().split("\n");

const meetingList = input
  .slice(1)
  .map((meeting) => meeting.split(" ").map(Number))
  .sort((a, b) => a[0] - b[0]);

let count = 0;

const dfs = (currentMeeting, currentCount, currentIdx) => {
  if (currentIdx === meetingList.length - 1) {
    count = Math.max(count, currentCount);
  }

  for (let i = currentIdx + 1; i < meetingList.length; i++) {
    if (currentMeeting[1] <= meetingList[i]) {
      dfs(meetingList[i], count + 1, i);
      break;
    }
  }

  count = Math.max(count, currentCount);
};

for (let i = 0; i < meetingList.length; i++) {
  dfs(meetingList[i], 1, i);
}

console.log(count);
