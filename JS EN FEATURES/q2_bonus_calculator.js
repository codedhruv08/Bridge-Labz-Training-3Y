"use strict"; // No implicit globals: every variable below is declared with const/let.

// ---------------------------------------------------------------
// Q2 - Employee Bonus Calculator
// ---------------------------------------------------------------
const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

/**
 * Convert a field to a Number or throw a descriptive error.
 * - Missing property  -> TypeError
 * - Non numeric text  -> RangeError
 * Number("") is 0 and Number(null) is 0, so we block those explicitly.
 */
function toNumber(emp, field) {
  const value = emp[field];
  if (value === undefined || value === null || String(value).trim() === "") {
    throw new TypeError(`Missing property "${field}" for employee "${emp.name}"`);
  }
  const n = Number(value);
  if (Number.isNaN(n)) {
    throw new RangeError(`Cannot convert ${field}="${value}" to a number for employee "${emp.name}"`);
  }
  return n;
}

function calculateBonus(emp) {
  if (emp === null || typeof emp !== "object") {
    throw new TypeError("Employee record is not an object");
  }
  const salary = toNumber(emp, "salary");
  const years = toNumber(emp, "years");
  // Rule: 10% bonus if years > 3, else 5%.
  const rate = years > 3 ? 0.1 : 0.05;
  const bonus = salary * rate;
  return { salary, years, rate, bonus };
}

function printReport(list, title) {
  console.log(`\n=== ${title} ===`);
  for (const emp of list) {
    try {
      const r = calculateBonus(emp);
      // Template string for formatted output.
      console.log(
        `Employee : ${emp.name}\n` +
        `  Salary : Rs.${r.salary.toLocaleString("en-IN")}\n` +
        `  Years  : ${r.years}\n` +
        `  Rate   : ${r.rate * 100}%\n` +
        `  Bonus  : Rs.${r.bonus.toLocaleString("en-IN")}\n` +
        `  Total  : Rs.${(r.salary + r.bonus).toLocaleString("en-IN")}`
      );
    } catch (err) {
      // try...catch keeps one bad record from crashing the whole run.
      console.log(`[ERROR] ${err.name}: ${err.message}`);
    }
  }
}

printReport(employees, "Q2: EMPLOYEE BONUS REPORT");

// Extra records proving the error handling works.
const badRecords = [
  { name: "Ravi", years: "4" },                    // salary missing
  { name: "Neha", salary: "abc", years: "3" },     // not numeric
  { name: "Omar", salary: "41000", years: "4" }    // valid
];
printReport(badRecords, "Q2: ERROR HANDLING DEMO");
