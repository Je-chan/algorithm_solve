function solution(m, musicinfos) {
  const musicinfosArr = musicinfos.map((el) => el.split(','));

  function hashDelete(cord) {
    let cordArr = cord.split('');
    let deleteIdx = [];
    let copied = [...cordArr];
    for (let i = 0; i < cordArr.length; i++) {
      if (cord[i] === '#') {
        cordArr.splice(i - 1, 1, cord[i - 1].toLowerCase());
        deleteIdx.push(i);
      }
    }
    deleteIdx.map((el) => cordArr.splice(el, 1, ''));
    return cordArr.join('');
  }

  let candidate = [];
  for (let musicinfo of musicinfosArr) {
    const startTime = musicinfo[0].split(':');
    const endTime = musicinfo[1].split(':');
    const realCord = hashDelete(musicinfo[3]);
    const rememberedCord = hashDelete(m);

    let heardCord = '';

    const timeLength =
      (Number(endTime[0]) - Number(startTime[0])) * 60 +
      (Number(endTime[1]) - Number(startTime[1]));

    if (realCord.length <= timeLength) {
      const mult = Math.floor((timeLength - realCord.length) / realCord.length);
      heardCord =
        realCord +
        realCord.repeat(mult) +
        realCord.slice(0, timeLength - realCord.length);
    } else if (realCord.length > timeLength) {
      heardCord = realCord.slice(0, timeLength);
    }

    if (rememberedCord.length > heardCord.length) continue;

    for (let i = 0; i < heardCord.length; i++) {
      if (heardCord.slice(i, rememberedCord.length + i) === rememberedCord) {
        candidate.push([timeLength, musicinfo[2]]);
        break;
      }
    }
  }

  if (candidate.length === 0) return '(None)';
  if (candidate.length === 1) return candidate[0][1];
  let max = candidate[0][0];
  let maxIdx = 0;

  for (let i = 1; i < candidate.length; i++) {
    if (max < candidate[i][0]) {
      max = candidate[i][0];
      maxIdx = i;
    }
  }

  return candidate[maxIdx][1];
}
