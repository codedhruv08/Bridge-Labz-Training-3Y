"use strict";

// ---------------------------------------------------------------
// Q3 - Transaction Validator
// ---------------------------------------------------------------
const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

// Custom error classes so each failure type can be categorized by name.
class NegativeAmountError extends Error {
  constructor(id, amount) {
    super(`Transaction ${id} has negative amount (${amount})`);
    this.name = "NegativeAmountError";
  }
}
class MissingFieldError extends Error {
  constructor(field, id) {
    super(`Transaction ${id === undefined ? "(unknown id)" : id} is missing "${field}"`);
    this.name = "MissingFieldError";
  }
}
class NullTransactionError extends Error {
  constructor(index) {
    super(`Entry at index ${index} is null`);
    this.name = "NullTransactionError";
  }
}

function validate(tx, index) {
  if (tx === null) throw new NullTransactionError(index);   // check null FIRST: tx.id on null would throw a raw TypeError
  if (tx.id === undefined) throw new MissingFieldError("id", tx.id);
  if (tx.amount === undefined) throw new MissingFieldError("amount", tx.id);
  if (tx.amount < 0) throw new NegativeAmountError(tx.id, tx.amount);
  return true;
}

const valid = [];
const invalid = [];
const errorCategories = {}; // e.g. { NegativeAmountError: 1, ... }

for (let i = 0; i < transactions.length; i++) {
  const tx = transactions[i];

  // BREAKPOINT: click the gutter next to the line below (or leave this `debugger;`).
  // Add Watch expressions: i, tx, valid.length, invalid.length, errorCategories
  // The statement only pauses when a debugger (VS Code F5) is attached; otherwise it is ignored.
  debugger;

  try {
    validate(tx, i);
    valid.push(tx);
  } catch (err) {
    invalid.push({ index: i, type: err.name, message: err.message });
    errorCategories[err.name] = (errorCategories[err.name] || 0) + 1;
  }
}

console.log("=== Q3: TRANSACTION REPORT ===");
console.log("\nValid transactions:");
valid.forEach(t => console.log(`  [OK] id=${t.id} amount=${t.amount}`));
console.log("\nInvalid transactions:");
invalid.forEach(e => console.log(`  [FAIL] index ${e.index} | ${e.type} | ${e.message}`));
console.log("\nError categories:", errorCategories);
console.log(`\nSuccessful: ${valid.length} | Failed: ${invalid.length} | Total: ${transactions.length}`);
