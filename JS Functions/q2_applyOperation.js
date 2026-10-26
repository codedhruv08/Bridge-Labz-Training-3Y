// Q2: applyOperation takes an array and a callback applied to every element

function applyOperation(numbers, operation) {
  const result = [];                       // store transformed values
  for (const num of numbers) {
    result.push(operation(num));           // callback decides what happens
  }
  return result;
}

const numbers = [1, 2, 3, 4];

// Callback 1: double a number
const double = (n) => n * 2;
// Callback 2: square a number
const square = (n) => n * n;

console.log("Original:", numbers);
console.log("Doubled :", applyOperation(numbers, double)); // [2, 4, 6, 8]
console.log("Squared :", applyOperation(numbers, square)); // [1, 4, 9, 16]
