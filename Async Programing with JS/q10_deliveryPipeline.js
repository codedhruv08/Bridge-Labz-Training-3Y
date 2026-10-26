// Q10: The Final Delivery - Async Pipeline Debugger

// Builds a step: waits 1-2 seconds (random), then succeeds or fails (15% failure).
// setTimeout hands the waiting to the host (Node/browser timers). The call stack is
// free meanwhile; when the timer fires, resolve()/reject() settles the Promise and
// the awaiting code resumes through the microtask queue.
function createStep(successMessage, failureMessage) {
  return () =>
    new Promise((resolve, reject) => {
      const delay = 1000 + Math.random() * 1000;
      setTimeout(() => {
        if (Math.random() < 0.15) {
          reject(new Error(failureMessage));
        } else {
          resolve(successMessage);
        }
      }, delay);
    });
}

const takeOrder = createStep("Step 1: Order taken", "Could not take order");
const prepare = createStep("Step 2: Food prepared", "Kitchen failed");
const pack = createStep("Step 3: Package ready", "Packing failed");
const dispatch = createStep("Step 4: Out for delivery", "No rider available");
const deliver = createStep("Delivery completed!", "Delivery failed");

async function runPipeline() {
  console.log("Start Pipeline");
  try {
    // Each `await` pauses runPipeline (not the whole program). Control returns to the
    // event loop, which can run other tasks until the Promise settles. When it does,
    // the function resumes here as a microtask, in strict order.
    console.log(await takeOrder());
    console.log(await prepare());
    console.log(await pack());
    console.log(await dispatch());
    console.log(await deliver());
  } catch (error) {
    // A rejected Promise makes `await` throw, skipping the remaining steps
    console.log(`(${error.message})`);
    console.log("Pipeline failed!");
  }
}

runPipeline();
console.log("(runPipeline paused at its first await; this line runs right away)");
