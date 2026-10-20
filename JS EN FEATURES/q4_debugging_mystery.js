"use strict";

// ---------------------------------------------------------------
// Q4 - Debugging Mystery
// ---------------------------------------------------------------

// ORIGINAL (buggy) version - wrapped in try/catch so the file can keep running.
function showMessageBuggy() {
  greeting = "Welcome"; // undeclared -> assignment to a variable that was never declared
  console.log(greeting);
}

console.log("=== Q4: DEBUGGING MYSTERY ===");
console.log("\n1) Why does it fail?");
try {
  showMessageBuggy();
} catch (err) {
  // Expected: ReferenceError: greeting is not defined
  console.log(`   ${err.name}: ${err.message}`);
}
// EXPLANATION:
// In sloppy mode `greeting = "Welcome"` silently creates a GLOBAL property (an "implicit global").
// In strict mode that behaviour is removed: assigning to a name that was never declared with
// var/let/const throws ReferenceError. That prevents typo bugs and accidental global pollution.

// Proof of the sloppy behaviour: new Function bodies are NOT strict unless they say so.
const sloppy = new Function('sloppyGreeting = "Welcome"; return sloppyGreeting;');
console.log("\n   Sloppy-mode version returns:", sloppy());
console.log("   ...and leaked a global:", typeof globalThis.sloppyGreeting, "->", globalThis.sloppyGreeting);
delete globalThis.sloppyGreeting; // tidy up

// 2) FIX: declare the variable so it is local to the function.
function showMessage() {
  const greeting = "Welcome"; // block/function scoped, no leak. Use let if it must change.

  // DEBUG: set a breakpoint on the next line, press F5.
  // Watch panel: add `greeting`  | Call Stack panel will show: showMessage <- (anonymous / Module._compile ...)
  debugger;
  console.log(greeting);
}

console.log("\n2) Fixed version:");
showMessage();
console.log("   typeof greeting outside the function:", typeof greeting, "(no leak - scope declaration rules respected)");

// 3) DEBUGGER NOTES (VS Code):
//  - Open this file, click left of line numbers to add a breakpoint (or keep the debugger; statement).
//  - Run > Start Debugging (F5) and choose Node.js.
//  - WATCH panel: click "+" and type `greeting`. Before the assignment it shows "not available"
//    (TDZ for const), after stepping (F10) it shows "Welcome".
//  - CALL STACK panel: top frame is showMessage, below it the module wrapper frame. Step Into (F11)
//    on the call shows a new frame being pushed; when the function ends it is popped.
