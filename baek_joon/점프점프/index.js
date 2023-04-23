/** @format */

const fs = require('fs');
const qArgs = fs.readFileSync('../dev/stdin').toString().split('\n');

console.log(qArgs);
const N = Number(qArgs[0]);
const line = qArgs[1].split(' ').map((Ai) => Number(Ai));

const jumpRecord = Array.from({ length: N }, (_, idx) =>
  idx === 0 ? 0 : Number.MAX_SAFE_INTEGER
);

(function () {
  for (let i = 0; i < N; i++) {
    if (jumpRecord[i] !== Number.MAX_SAFE_INTEGER) {
      const jump = line[i];

      if (jump === 0 && i !== N - 1) continue;

      for (let j = 1; j <= jump; j++) {
        if (i + j > N) continue;
        jumpRecord[i + j] = Math.min(jumpRecord[i] + 1, jumpRecord[i + j]);
      }
    }
  }
})();

console.log(
  jumpRecord[N - 1] === Number.MAX_SAFE_INTEGER ? -1 : jumpRecord[N - 1]
);
