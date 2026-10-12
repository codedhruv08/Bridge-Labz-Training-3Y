const num1 = Math.floor(Math.random() * 20) + 1;  // 1-20
const num2 = Math.floor(Math.random() * 20) + 1;  // 1-20
const operators = ['+', '-', '*', '/'];
const operator = operators[Math.floor(Math.random() * operators.length)];
 
let answer;
switch (operator) {
  case '+': answer = num1 + num2; break;
  case '-': answer = num1 - num2; break;
  case '*': answer = num1 * num2; break;
  case '/': answer = (num1 / num2).toFixed(2); break; // 2 decimals
}
 
console.log(`Question: What is ${num1} ${operator} ${num2}?`);
console.log(`Correct answer: ${answer}`);
 