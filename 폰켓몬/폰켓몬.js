function solution(nums) {
	const ponketmonCategoryCount = new Set(nums).size;
  const selectCount = nums.length / 2
  
  return Math.min(ponketmonCategoryCount, selectCount)
}
