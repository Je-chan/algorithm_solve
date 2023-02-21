/** @format */

const fs = require('fs');
const input = fs.readFileSync('./dev/stdin').toString().trim().split('\n');

let preorder, inorder;

let answer = '';
function postorder(root, start, end) {
  if (start > end) {
    return;
  }

  for (let i = start; i < end; i++) {
    if (preorder[root] === inorder[i]) {
      postorder(root + 1, start, i);
      postorder(root + 1 + (i - start), i + 1, end);
      answer += preorder[root];
    }
  }
}

for (let i = 0; i < input.length; i++) {
  [preorder, inorder] = input[i]
    .trim()
    .split(' ')
    .map((str) => str.split(''));
  postorder(0, 0, preorder.length);
  console.log(answer);
  answer = '';
}
