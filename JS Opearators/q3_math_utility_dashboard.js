// Q3. Math Utility Dashboard

const x = 16.75;

// Perform the calculations
const roundedValue = Math.round(x);
const squareRoot = Math.sqrt(x);
const cubed = Math.pow(x, 3);
const randomNumber = Math.floor(Math.random() * 41) + 10; // 10 to 50

// Formatted summary using template literals
console.log(`
===== Math Dashboard =====
Number          : ${x}
Rounded value   : ${roundedValue}
Square root     : ${squareRoot.toFixed(4)}
Power (x^3)     : ${cubed.toFixed(4)}
Random (10-50)  : ${randomNumber}
==========================
`);
