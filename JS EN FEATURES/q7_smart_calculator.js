"use strict";

// ---------------------------------------------------------------
// Q7 - Smart Calculator
// ---------------------------------------------------------------
const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

// Custom errors
class DivideByZeroError extends Error {
  constructor() { super("Cannot divide by zero"); this.name = "DivideByZeroError"; }
}
class NegativeRootError extends Error {
  constructor(n) { super(`Cannot take the square root of a negative number (${n})`); this.name = "NegativeRootError"; }
}
class InvalidOperationError extends Error {
  constructor(op) { super(`Unknown operation "${op}"`); this.name = "InvalidOperationError"; }
}

function calculate(op, a, b) {
  switch (op) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "divide":
      if (b === 0) throw new DivideByZeroError();
      return a / b;
    case "power":
      return Math.pow(a, b);          // 25 ** 0 = 1
    case "root":
      if (a < 0) throw new NegativeRootError(a);
      return Math.sqrt(a);            // square root of the first number
    default:
      throw new InvalidOperationError(op);
  }
}

function runSuite(ops, a, b, title) {
  console.log(`\n=== ${title} (num1=${a}, num2=${b}) ===`);
  let ok = 0, failed = 0;
  for (const op of ops) {
    try {
      const result = calculate(op, a, b);
      console.log(`  [OK]   ${op.padEnd(9)} -> ${result}`);
      ok++;
    } catch (err) {
      console.log(`  [FAIL] ${op.padEnd(9)} -> ${err.name}: ${err.message}`);
      failed++;
    }
  }
  console.log(`  Summary: ${ok} succeeded, ${failed} failed`);
}

runSuite(operations, num1, num2, "Q7: SMART CALCULATOR");
// Extra runs to exercise the other error paths.
runSuite(["root", "add"], -16, 4, "Negative root test");
runSuite(["modulo", "divide"], 10, 2, "Unknown operation test");
