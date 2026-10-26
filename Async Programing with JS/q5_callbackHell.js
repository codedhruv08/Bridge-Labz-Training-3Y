// Q5: Frontend Rush - Avoiding Callback Hell

// Generic stage: logs after 1 second, then calls the callback
function stageWithCallback(stageName, callback) {
  setTimeout(() => {
    console.log(`  ${stageName} done`);
    callback();
  }, 1000);
}

// Promise version of a stage (used by async/await)
function stageWithPromise(stageName) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`  ${stageName} done`);
      resolve();
    }, 1000);
  });
}

// ---------- Version 1: nested callbacks (callback hell) ----------
function runWithCallbacks(onFinish) {
  console.log("Callback version:");
  stageWithCallback("Design", () => {
    stageWithCallback("Build", () => {
      stageWithCallback("Test", () => {
        stageWithCallback("Deploy", () => {
          stageWithCallback("Celebrate", () => {   // pyramid of doom
            onFinish();
          });
        });
      });
    });
  });
}

// ---------- Version 2: async/await ----------
async function runWithAsyncAwait() {
  console.log("Async/await version:");
  await stageWithPromise("Design");
  await stageWithPromise("Build");
  await stageWithPromise("Test");
  await stageWithPromise("Deploy");
  await stageWithPromise("Celebrate");
}

// Run callback version first, then async/await version
runWithCallbacks(async () => {
  await runWithAsyncAwait();
  console.log("Pipeline finished");
});

/*
 WHY async/await IS MORE READABLE:
 - Code reads top to bottom like synchronous code; no deeper and deeper nesting.
 - Each stage is one line, so adding/removing/reordering a stage is easy.
 - Errors can be handled in one place with try/catch instead of in every callback.
 - Execution order is obvious: each `await` pauses until that stage finishes.
*/
