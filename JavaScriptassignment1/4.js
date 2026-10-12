const marks = [78, 85, 92, 66, 74];   // 5 subjects, each out of 100
 
let sum = 0;
for (const m of marks) sum += m;
 
const average = sum / marks.length;
const percentage = (sum / (marks.length * 100)) * 100; // overall %
 
// Validation: any subject below 35 => automatically Detained
const failedSubject = marks.some(m => m < 35);
 
let result;
if (failedSubject || percentage < 50) {
  result = "Detained";
} else if (percentage >= 85) {
  result = "Promoted with Distinction";
} else {
  result = "Promoted";               // 50% - 84.99%
}
 
console.log(`Marks: ${marks.join(", ")}`);
console.log(`Average: ${average.toFixed(2)}`);
console.log(`Percentage: ${percentage.toFixed(2)}%`);
console.log(`Result: ${result}`);
 