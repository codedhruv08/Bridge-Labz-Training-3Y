// Q6. Event-Based Counter Simulation

let count = 0;

// Increase count by 1 and log it
function increment() {
  count++;
  console.log("Incremented -> count =", count);
}

// Decrease count by 1 and log it
function decrement() {
  count--;
  console.log("Decremented -> count =", count);
}

// Nested function example: inner function can access and update
// the outer function's variable (function scope / closure)
function nestedCounterDemo() {
  let localCount = 10; // belongs to nestedCounterDemo's scope

  function addFive() {
    localCount += 5;   // inner function updates outer function's variable
    console.log("Nested addFive -> localCount =", localCount);
  }

  addFive();
  addFive();
  console.log("Final localCount seen by outer function:", localCount);
}

// Simulate clicks by calling functions manually
console.log("Initial count:", count);
increment(); // click +
increment(); // click +
decrement(); // click -
increment(); // click +

nestedCounterDemo();
