const expenses = [4500, 2000, 12000, 3000, 1500];
 
let total = 0;
for (let i = 0; i < expenses.length; i++) {
  total += expenses[i];            // assignment operator: add each expense
}
const average = total / expenses.length;
 
let finalAmount = total;
finalAmount += total * 0.10;       // add 10% tax using +=
 
console.log(`Total expenses     : ${total.toFixed(2)}`);
console.log(`Average per category: ${average.toFixed(2)}`);
console.log(`Final after 10% tax : ${finalAmount.toFixed(2)}`);
 
