function solution(info, n, m) {
    let dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;

    for(let i = 0; i < info.length; i++) {
        let newDp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);

        for(let j = 0 ; j < n + 1 ; j++) {
            if(dp[j] !== Number.MAX_SAFE_INTEGER) {
                const [costA, costB] = info[i]

                const nowCostA = j + costA
                if(nowCostA < n) {
                    newDp[nowCostA] = Math.min(newDp[nowCostA], dp[j])
                }

                const currentCostB = dp[j]
                const nowCostB = currentCostB + costB

                if(nowCostB < m) {
                    newDp[j] = Math.min(nowCostB, newDp[j]);
                }
            }
        }

        dp = newDp;
    }

    for(let i = 0; i < n; i++) {
        if(dp[i] !== Number.MAX_SAFE_INTEGER) {
            return i
        }
    }

    return -1
}
