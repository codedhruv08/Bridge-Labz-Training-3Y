// Q4: DevOps Delay - Async Timeout Race

// Creates a server that responds after `seconds`; may fail randomly (15% chance)
function deployToServer(name, seconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.15) {
        reject(new Error(`${name} failed to respond`));
      } else {
        resolve(`${name} (${seconds}s)`);
      }
    }, seconds * 1000);
  });
}

// Promise.all waits for ALL servers; rejects if ANY fails
function runAll() {
  return Promise.all([deployToServer("Server A", 2), deployToServer("Server B", 3)])
    .then((results) => {
      console.log("Responses:", results.join(", "));
      console.log("Deployment completed for all servers");
    })
    .catch((error) => console.log("Promise.all error:", error.message));
}

// Promise.race settles as soon as the FIRST promise settles
function runRace() {
  return Promise.race([deployToServer("Server A", 2), deployToServer("Server B", 3)])
    .then((fastest) => console.log("Fastest response:", fastest))
    .catch((error) => console.log("Promise.race error:", error.message));
}

// Run both demos (they run concurrently)
runAll();
runRace();
