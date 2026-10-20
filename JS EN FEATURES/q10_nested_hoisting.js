"use strict";

// ---------------------------------------------------------------
// Q10 - Nested Hoisting and Closures
// ---------------------------------------------------------------
console.log("=== Q10: NESTED HOISTING ===");

function outer() {
  console.log(count);        // 1st output
  var count = 5;
  function inner() {
    console.log(count);      // 2nd output
    var count = 10;
  }
  inner();
}

// 1) PREDICTION: prints  undefined  then  undefined.
//  - outer(): `var count` is hoisted to the top of outer and initialised with undefined -> undefined
//    (the assignment = 5 happens later).
//  - inner(): it declares ITS OWN `var count`, which is hoisted to the top of inner and shadows outer's count.
//    So the closure never reaches outer's count (5); it sees its own count = undefined.
//    Common wrong guess: "5", because we expect the closure to see the outer variable.
console.log("\n--- Original ---");
outer();

// 2) Separate memory contexts created by hoisting (conceptually):
//   Global: { outer: <function> }
//   outer() execution context:  { count: undefined -> 5, inner: <function> }   // both hoisted
//     inner() execution context: { count: undefined -> 10 }                    // its own var, shadows outer
console.log("\n--- Same function with hoisting made explicit ---");
function outerExplicit() {
  var count;                 // hoisted declaration
  function inner() {
    var count;               // hoisted declaration (separate memory)
    console.log(count);      // undefined
    count = 10;
  }
  console.log(count);        // undefined
  count = 5;
  inner();
  console.log(`outer's count is still ${count} (inner never changed it)`);
}
outerExplicit();

// Without the inner var, the closure WOULD see outer's variable:
console.log("\n--- Closure without shadowing ---");
function outerClosure() {
  var count = 5;
  function inner() { console.log(count); } // no own count -> looks up the scope chain -> 5
  inner();
}
outerClosure();

// 3) inner as an arrow function
console.log("\n--- Arrow version ---");
function outerArrow() {
  console.log(count);        // undefined (outer var still hoisted)
  var count = 5;
  const inner = () => {
    console.log(count);      // still undefined: arrow functions have their own function scope for var
    var count = 10;
  };
  inner();                   // works because it is called AFTER the const line
}
outerArrow();
// Behaviour changes with an arrow:
//  a) Not hoisted as a usable function: calling inner() before the const line throws ReferenceError (TDZ).
//  b) No own `this`/`arguments` (they come from outer) - not visible in this example.
//  c) Shadowing with var inside works the same: output is still undefined.
function arrowTooEarly() {
  try { inner(); } catch (e) { console.log(`  calling arrow too early -> ${e.name}: ${e.message}`); }
  const inner = () => {};
}
arrowTooEarly();

// 4) DEBUG SESSION (VS Code): set breakpoints on `console.log(count)` in outer and inner, press F5.
//  Call stack when stopped inside inner:
//     inner      <- top frame (current)
//     outer
//     (anonymous) / Module._compile ...   <- the file's module wrapper
//  Flow: module -> outer() pushed -> console.log(count) -> inner() pushed -> its console.log -> inner popped
//        -> outer continues -> outer popped.
//  Watch `count` in each frame: Variables > Local shows outer.count = undefined then 5, and inner.count
//  = undefined then 10 - two separate variables, proving separate memory contexts.
console.log("\n--- Debug demo (breakpoint) ---");
function outerDebug() {
  var count = 5;
  function inner() {
    debugger; // pauses here when a debugger is attached; check the Call Stack and Watch panels
    var count = 10;
    return count;
  }
  return inner();
}
console.log("inner returned", outerDebug());
