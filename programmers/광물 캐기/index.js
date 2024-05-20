function solution(picks, minerals) {
  const fatigueObj = {
    diamondPick: {
      diamond: 1,
      iron: 1,
      stone: 1,
    },
    ironPick: {
      diamond: 5,
      iron: 1,
      stone: 1
    },
    stonePick: {
      diamond: 25,
      iron: 5,
      stone: 1
    }
  }

  const pickList = picks.flatMap((pick, idx) => {
        if (idx === 0) return new Array(pick).fill('diamondPick')
        if (idx === 1) return new Array(pick).fill('ironPick')
        else return new Array(pick).fill('stonePick')
      }
  )

  const taskList = []
  let count = 0;
  let tempTask = []

  for (let i = 0; i < minerals.length; i++) {
    count++
    tempTask.push(minerals[i])

    if (count === 5 || i === minerals.length - 1) {
      const taskLevel = tempTask.reduce((acc, cur) => {
        return acc + (cur === 'diamond' ? 3 : 'iron' ? 2 : 1)
      }, 0)
      taskList.push([taskLevel, tempTask])
      tempTask = []
      count = 0
    }
  }

  taskList.sort((a, b) => b[0] - a[0])


  console.log("TASK LIST: ", taskList)
  console.log("PICK LIST: ", pickList)


  return taskList.reduce((acc, cur, idx) => {
    if (idx > pickList.length - 1) return acc

    const pick = pickList[idx]
    return acc + cur[1].reduce((a, b) => {
      return a + fatigueObj[pick][b]
    }, 0)
  }, 0)
}

// console.log(solution([1, 3, 2], ["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"]))
console.log(solution([0, 0, 3], [
  "diamond",
  "iron",
  "stone",
  "diamond",
  "diamond",
  "diamond",
  "diamond",
  "diamond",
  "diamond",
  "stone",
  "diamond",
  "iron",
  "iron",
  "iron",
  "iron",
  "iron",
  "iron",
  "diamond"]))