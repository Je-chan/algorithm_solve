/**
 * 백트랙킹의 가장 일반적인 형태
 *
 * function backtracking() {
 *      if(종료 조건 만족시) {
 *          return 처리
 *      }
 *
 *      for(자식 노드를 하나씩 확인) {
 *          if(임의의 조건 만족) {
 *              자식 노드 방문 처리;
 *              backtracking 재귀 호출;
 *              자식 노드 방문 처리 해제;
 *          }
 *      }
 * }
 */
