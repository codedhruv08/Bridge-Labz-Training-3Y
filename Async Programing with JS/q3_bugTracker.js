// Q3: Bug Tracker - Callback to Promise Migration

// Original callback-based version (kept for reference)
function fetchBugs(callback) {
  setTimeout(() => callback(["UI glitch", "API timeout", "Login failure"]), 1000);
}

// Promise-based version
// simulateFailure = true makes the "API" fail
function getBugs(simulateFailure = false) {
  return new Promise((resolve, reject) => {
    fetchBugs((bugs) => {                       // reuse the old function inside the Promise
      if (simulateFailure) {
        reject(new Error("API request failed"));
      } else {
        resolve(bugs);
      }
    });
  });
}

// Random failure using a boolean
const apiShouldFail = Math.random() < 0.3;
console.log("Simulating failure:", apiShouldFail);

getBugs(apiShouldFail)
  .then((bugs) => {
    // Convert array to objects so console.table shows ID and description
    const bugTable = bugs.map((description, index) => ({ id: index + 1, description }));
    console.table(bugTable);
  })
  .catch((error) => console.log("Error:", error.message));
