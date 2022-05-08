# Python 에서 regex 를 사용할 수 있는 라이브러리
import re

def solution(new_id):
    idReplaced = new_id
    idReplaced = idReplaced.lower()
    idReplaced = re.sub('[^a-z0-9\-_.]', '', idReplaced)
    idReplaced = re.sub('\.+', '.', idReplaced)
    idReplaced = re.sub('^[.]|[.]$', '', idReplaced)
    idReplaced = 'a' if len(idReplaced) == 0 else idReplaced[:15]
    idReplaced = re.sub('^[.]|[.]$', '', idReplaced)
    idReplaced = idReplaced if len(idReplaced) > 2 else idReplaced + "".join([idReplaced[-1] for i in range(3-len(idReplaced))])
    return idReplaced