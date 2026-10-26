// Q9: Debugging the Event Loop

/*
 PREDICTED OUTPUT (written before running):
   1. Script start
   2. Script end
   3. Promise callback
   4. Timeout callback
*/

console.log("Script start");

setTimeout(() => console.log("Timeout callback"), 0);

Promise.resolve().then(() => console.log("Promise callback"));

console.log("Script end");

/*
 ACTUAL OUTPUT:
   Script start
   Script end
   Promise callback
   Timeout callback
 -> Matches the prediction.

 EXPLANATION:
 - Synchronous code ("Script start", "Script end") runs first on the call stack.
 - setTimeout's callback is placed in the macrotask queue (even with 0 ms).
 - The Promise .then() callback is placed in the microtask queue.
 - When the call stack is empty, the event loop empties the whole microtask queue
   BEFORE picking the next macrotask. So "Promise callback" runs before
   "Timeout callback".
*/
