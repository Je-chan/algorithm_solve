def solution(lottos, win_nums):
    zeroCount = lottos.count(0)
    correctCount = len(set(lottos) & set(win_nums))
    
    maxCount = correctCount + zeroCount 
    minCount = correctCount
    
    return [7 - max(maxCount, 1), 7 - max(minCount, 1)]