// Q7: The Lazy Loader - Promise.allSettled()

// Randomly rejects ~one module: wraps a loader so it may fail
function loadProfile() { return new Promise((r) => setTimeout(() => r("Profile Loaded"), 2000)); }
function loadPosts() { return new Promise((r) => setTimeout(() => r("Posts Loaded"), 1500)); }
function loadMessages() { return new Promise((r) => setTimeout(() => r("Messages Loaded"), 1000)); }

// Wrap a loader so that it rejects (after its normal delay) when `shouldFail` is true
function maybeReject(loader, moduleName, shouldFail) {
  return loader().then((message) => {
    if (shouldFail) throw new Error(`${moduleName} failed to load`);
    return message;
  });
}

async function loadDashboard() {
  const startTime = Date.now();

  // Randomly pick which ONE module will fail (0, 1 or 2)
  const failingIndex = Math.floor(Math.random() * 3);

  // allSettled never rejects: it waits for every promise and reports each result
  const results = await Promise.allSettled([
    maybeReject(loadProfile, "Profile", failingIndex === 0),
    maybeReject(loadPosts, "Posts", failingIndex === 1),
    maybeReject(loadMessages, "Messages", failingIndex === 2),
  ]);

  const moduleNames = ["Profile", "Posts", "Messages"];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`${moduleNames[index]}: SUCCESS -> ${result.value}`);
    } else {
      console.log(`${moduleNames[index]}: FAILED  -> ${result.reason.message}`);
    }
  });

  // Loaders run in parallel, so total time is about the slowest one (~2 s)
  const totalTime = Date.now() - startTime;
  console.log(`Total time taken: ${totalTime} ms`);
}

loadDashboard();
