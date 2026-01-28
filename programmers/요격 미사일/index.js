function solution(targets) {
    const sorted = targets.sort((before, after) => before[1] - after[1])

    let shotCount = 0;
    let shotPosition = 0;

    for(const [s, e] of sorted) {
        if(s < shotPosition && shotPosition < e) {
            continue;
        } else {
            shotPosition = e - 0.000001;
            shotCount++
        }

    }

    return shotCount
}