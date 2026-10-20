"use strict";

// ---------------------------------------------------------------
// Q5 - Hoisting Lab: The Sequence Trap
// ---------------------------------------------------------------

console.log("=== Q5: HOISTING LAB ===");

// PREDICTION (original code, run as-is):
//   console.log(score);  -> undefined       (var hoisted, initialised to undefined)
//   announce();          -> "Game started"  (function declaration fully hoisted)
//   startGame();         -> "ready"         (let status is already initialised when called)
console.log("\n--- Part 0: original code as given ---");
console.log(score);
announce();
var score = 50;
function announce() { console.log("Game started"); }
let status = "ready";
startGame();
function startGame() {
  console.log(status);
}

// ---------------------------------------------------------------
// Task 1: memory state of each hoisted element (before any line executes)
// ---------------------------------------------------------------
// | Name       | Declaration      | Hoisted? | State at top of scope                         |
// |------------|------------------|----------|-----------------------------------------------|
// | score      | var              | yes      | allocated, value = undefined                  |
// | announce   | function decl.   | yes      | allocated AND fully initialised (callable)    |
// | status     | let              | yes*     | allocated but in the TDZ (Temporal Dead Zone) |
// | startGame  | function decl.   | yes      | allocated AND fully initialised (callable)    |
// *let/const are hoisted but cannot be touched until their declaration line runs.
// The original works only because `let status = "ready"` runs BEFORE startGame() is called.

console.log("\n--- Task 1: the trap (calling startGame BEFORE let status) ---");
function trapSequence() {
  try {
    startGame2();                       // function is hoisted, so the call is allowed...
  } catch (e) {
    console.log(`  ${e.name}: ${e.message}`); // ...but status2 is still in the TDZ -> ReferenceError
  }
  let status2 = "ready";
  function startGame2() { console.log(status2); }
}
trapSequence();

// ---------------------------------------------------------------
// Task 2: fixed, order-safe version (declare first, use after)
// ---------------------------------------------------------------
console.log("\n--- Task 2: fixed code ---");
function fixedGame() {
  let score = 50;                       // declared & initialised first
  let status = "ready";
  function announce() { console.log("Game started"); }
  function startGame() { console.log(`status: ${status}, score: ${score}`); }
  announce();
  startGame();
}
fixedGame();

// ---------------------------------------------------------------
// Task 3: arrow functions - they are NOT hoisted like declarations
// ---------------------------------------------------------------
console.log("\n--- Task 3: arrow functions vs hoisting ---");
function arrowDemo() {
  // (a) const + arrow: binding is in the TDZ until the line runs
  try { announceArrow(); } catch (e) { console.log(`  const arrow : ${e.name}: ${e.message}`); }
  const announceArrow = () => console.log("Game started (arrow)");

  // (b) var + arrow: variable hoisted as undefined, so calling gives a TypeError instead
  try { announceVar(); } catch (e) { console.log(`  var arrow   : ${e.name}: ${e.message}`); }
  var announceVar = () => console.log("Game started (var arrow)");

  // After the definition both work.
  announceArrow();
  announceVar();
}
arrowDemo();
// SUMMARY: function declaration -> usable anywhere in scope;
//          const/let arrow -> ReferenceError (TDZ) before definition;
//          var arrow       -> TypeError ("not a function") because value is undefined.
