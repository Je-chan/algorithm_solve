/** @format */

const fs = require('fs');

let courses = [];
let students = [];

function main() {
  const input = fs.readFileSync('../dev/stdin').toString().trim().split('\n');
  const N = Number(input.shift());
  for (let i = 0; i < N; i++) {
    const tmp = input.shift().split(' ').map(Number);
    courses.push(new Set(tmp.slice(1)));
  }
  const M = Number(input.shift());
  for (let i = 0; i < M; i++) {
    const tmp = input.shift().split(' ').map(Number);
    students.push(new Set(tmp.slice(1)));
  }
  evaluateStudents();
}

function evaluateStudents() {
  for (let student of students) {
    let count = 0;
    for (let course of courses) {
      if ([...course].filter((x) => student.has(x)).length === course.size) {
        count++;
      }
    }
    console.log(count);
  }
}

main();
