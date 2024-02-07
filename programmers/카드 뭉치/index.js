function solution(cards1, cards2, goal) {
  let card1Idx = 0;
  let card2Idx = 0;

  for (const word of goal) {
    if (cards1[card1Idx] === word) {
      card1Idx++;
    } else if (cards2[card2Idx] === word) {
      card2Idx++;
    } else {
      return "No";
    }
  }

  return "Yes";
}

console.log(
  solution(
    ["i", "drink", "water"],
    ["want", "to"],
    ["i", "want", "to", "drink", "water"],
  ),
); // "YES"

console.log(
  solution(
    ["i", "water", "drink"],
    ["want", "to"],
    ["i", "want", "to", "drink", "water"],
  ),
); // "NO"
