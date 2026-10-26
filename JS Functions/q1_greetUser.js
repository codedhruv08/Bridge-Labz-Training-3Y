// Q1: Callback flow - greetUser() calls showEndMessage() after greeting

// Callback function: runs AFTER the greeting is printed
function showEndMessage() {
  console.log("Welcome to the course!");
}

// Main function: receives a name and a function to call when done
function greetUser(name, callback) {
  console.log("Hello " + name);   // Step 1: print greeting
  callback();                     // Step 2: execute the callback
}

console.log("--- Start ---");
greetUser("Dhruv", showEndMessage); // Pass function reference (no parentheses!)
console.log("--- End ---");
// Flow: Start -> Hello Dhruv -> Welcome to the course! -> End
