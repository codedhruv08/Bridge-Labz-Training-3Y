// Q1. Scope Conflict Resolver

// Global variable: visible everywhere in the script
var bonus = 5000;

function calculateSalary(isPermanent) {
  // Local variables: exist only inside this function
  // (isPermanent is a parameter, so it is local to the function too)
  let salary = 40000;

  // Add the global bonus only for permanent employees
  if (isPermanent === true) {
    salary = salary + bonus;
  }

  console.log(`isPermanent = ${isPermanent} -> Total salary: ${salary}`);
}

// Demonstrate how changing isPermanent affects the result
calculateSalary(true);   // 40000 + 5000 = 45000
calculateSalary(false);  // 40000 only

// The global variable is never modified by the function
console.log("Global bonus after calls:", bonus);

// Local variables are NOT accessible outside the function
console.log("typeof salary outside function:", typeof salary);           // undefined
console.log("typeof isPermanent outside function:", typeof isPermanent); // undefined
