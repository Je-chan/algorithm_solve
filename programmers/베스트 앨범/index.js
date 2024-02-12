function solution(genres, plays) {
  const genreMap = new Map();
  const genrePriorityMap = new Map();

  for (let id = 0; id < genres.length; id++) {
    const genre = genres[id];
    const playCount = plays[id];

    if (!genreMap.has(genre)) {
      genreMap.set(genre, [[id, playCount]]);
    } else {
      genreMap.get(genre).push([id, playCount]);
    }

    if (!genrePriorityMap.has(genre)) {
      genrePriorityMap.set(genre, playCount);
    } else {
      genrePriorityMap.set(genre, genrePriorityMap.get(genre) + playCount);
    }
  }

  for (const value of genreMap.values()) {
    value.sort((before, after) => after[1] - before[1]);
  }

  return [...genrePriorityMap.entries()]
    .sort((before, after) => after[1] - before[1])
    .flatMap(([genre]) =>
      genreMap
        .get(genre)
        .slice(0, 2)
        .map((value) => value[0]),
    );
}

console.log(
  solution(
    ["classic", "pop", "classic", "classic", "pop", "balad"],
    [500, 600, 150, 800, 300, 2000],
  ),
); // [4, 1, 3, 0]