// Q1. Student Result Processing (reduce + Classes)
class Student {
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }

  calculateAverage() {
    if (this.marks.length === 0) return 0;
    const total = this.marks.reduce((sum, mark) => sum + mark, 0);
    return total / this.marks.length;
  }

  getGrade() {
    const avg = this.calculateAverage();
    if (avg >= 75) return "A";
    if (avg >= 60) return "B";
    if (avg >= 40) return "C";
    return "F";
  }
}

const students = [
  new Student("Dhruv", [85, 90, 78, 92]),
  new Student("Aman", [65, 70, 58, 62]),
  new Student("Riya", [30, 25, 40, 35]),
];

students.forEach((s) => {
  console.log(`${s.name} | Average: ${s.calculateAverage().toFixed(2)} | Grade: ${s.getGrade()}`);
});
