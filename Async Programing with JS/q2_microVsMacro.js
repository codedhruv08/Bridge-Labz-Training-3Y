// Q2: Task Scheduler - Micro vs Macro Challenge

console.log("Start");                                             // 1. synchronous

setTimeout(() => console.log("setTimeout (macrotask)"), 0);       // goes to the macrotask queue

Promise.resolve().then(() => console.log("Promise.then (microtask)")); // goes to the microtask queue

console.log("Synchronous log");                                   // 2. synchronous

console.log("End");                                               // 3. synchronous

/*
 OUTPUT ORDER:
   Start
   Synchronous log
   End
   Promise.then (microtask)
   setTimeout (macrotask)

 WHY MICROTASKS RUN BEFORE MACROTASKS:
 1. The call stack runs all synchronous code first (Start, Synchronous log, End).
 2. When the stack is empty, the event loop FIRST drains the entire microtask
    queue (Promise callbacks, queueMicrotask).
 3. Only after the microtask queue is empty does it take ONE macrotask
    (setTimeout, setInterval, I/O) from the macrotask queue.
 So even with a 0 ms delay, setTimeout waits behind every pending microtask.
*/
