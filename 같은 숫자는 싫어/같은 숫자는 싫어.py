def no_continuous(s):
    answer = []
    for i in s:
        if answer[-1:] == [i]: continue
        answer.append(i)
    return answer
