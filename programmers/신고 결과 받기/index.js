function solution(id_list, report, k) {
  const reportedMap = new Map();

  for (const reportLog of report) {
    const [reporter, reported] = reportLog.split(" ");
    if (!reportedMap.has(reported)) {
      const reporterSet = new Set();
      reporterSet.add(reporter);
      reportedMap.set(reported, reporterSet);
    } else {
      reportedMap.get(reported).add(reporter);
    }
  }

  const reporterMap = new Map();

  for (const reporters of reportedMap.values()) {
    if (reporters.size >= k) {
      for (const reporter of reporters) {
        if (!reporterMap.has(reporter)) {
          reporterMap.set(reporter, 1);
        } else {
          reporterMap.set(reporter, reporterMap.get(reporter) + 1);
        }
      }
    }
  }

  return id_list.map((id) => reporterMap.get(id) || 0);
}

console.log(
  solution(
    ["muzi", "frodo", "apeach", "neo"],
    ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"],
    2,
  ),
);

console.log(
  solution(
    ["con", "ryan"],
    ["ryan con", "ryan con", "ryan con", "ryan con"],
    3,
  ),
);
