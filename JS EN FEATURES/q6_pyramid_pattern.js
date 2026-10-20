"use strict";

// ---------------------------------------------------------------
// Q6 - Pyramid Pattern Generator
// Usage: node q6_pyramid_pattern.js [rows]     (default rows = 5)
// ---------------------------------------------------------------

// Task 3: outer loop limit controlled by user input (command-line argument), default 5.
function getLimit() {
  const arg = process.argv[2];
  if (arg === undefined) return 5;
  const n = Number(arg);
  if (!Number.isInteger(n) || n < 1) {
    console.log(`Invalid input "${arg}", using default 5`);
    return 5;
  }
  return n;
}
const limit = getLimit();

console.log("=== Q6: PYRAMID PATTERN ===");

// Base version using let (block scoped: i and j die with their loops).
function pyramidLet(rows) {
  for (let i = 1; i <= rows; i++) {      // outer loop = row number
    let row = "";
    for (let j = 1; j <= i; j++) {       // inner loop = stars in this row
      row += "* ";
    }
    console.log(row.trimEnd());
  }
}
console.log(`\n--- let version (rows = ${limit}) ---`);
pyramidLet(limit);

// Task 1: replace let with var and observe.
function pyramidVar(rows) {
  for (var i = 1; i <= rows; i++) {
    var row = "";
    for (var j = 1; j <= i; j++) {
      row += "* ";
    }
    console.log(row.trimEnd());
  }
  // OBSERVATION 1: output is IDENTICAL, but var is function scoped, so i, j, row still exist here.
  console.log(`  after loop (var): i=${i}, j=${j}, row="${row.trimEnd()}"`);
}
console.log("\n--- var version ---");
pyramidVar(Math.min(limit, 4));

// Observation 2: closures capture differently.
console.log("\n--- closure capture: var vs let ---");
const fnsVar = [];
for (var a = 0; a < 3; a++) fnsVar.push(() => a);   // ONE shared a -> all see final value 3
const fnsLet = [];
for (let b = 0; b < 3; b++) fnsLet.push(() => b);   // NEW b per iteration -> 0,1,2
console.log("  var:", fnsVar.map(f => f()));
console.log("  let:", fnsLet.map(f => f()));

// Task 2: variable re-use hazard (the same var name reused in nested loops).
console.log("\n--- variable re-use hazard ---");
let safety = 0;
for (var k = 1; k <= 3; k++) {
  if (++safety > 6) { console.log("  var: aborted by safety counter - outer loop never finishes (shared k)!"); break; }
  for (var k = 0; k < 2; k++) { /* redeclaring var k is legal and reuses the SAME variable */ }
}
let outerRuns = 0;
for (let m = 1; m <= 3; m++) {
  outerRuns++;
  for (let m = 0; m < 2; m++) { /* inner m SHADOWS outer m: separate memory */ }
}
console.log(`  let: outer loop ran ${outerRuns} times and finished normally`);

// DEBUG STEPS (VS Code): put a breakpoint inside pyramidLet's inner loop, F5, then
//  - Watch: i, j, row. Press F10 repeatedly; j climbs 1..i and resets when i increments.
//  - With the var version also watch `i` in the Variables > Local scope: it stays alive after the loop.

// Task 4: strict mode catches undeclared loop variables.
console.log("\n--- strict mode: undeclared loop variable ---");
function badLoop() {
  for (z = 0; z < 3; z++) { }   // z never declared
}
try { badLoop(); } catch (e) { console.log(`  ${e.name}: ${e.message}`); }
