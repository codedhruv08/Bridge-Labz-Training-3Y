// Q1: The Startup Morning - Async Coffee Maker (Promise chaining)

// Helper: random delay between 1000 and 2000 ms
const randomDelay = () => 1000 + Math.random() * 1000;

// Helper: simulate a random failure (20% chance)
const shouldFail = () => Math.random() < 0.2;

// Each step returns a Promise that resolves (or rejects) after 1-2 seconds
function boilWater() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) return reject(new Error("Kettle stopped working"));
      console.log("Step 1: Water boiled");
      resolve("hot water");
    }, randomDelay());
  });
}

function brewCoffee(water) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) return reject(new Error("Coffee machine jammed"));
      console.log(`Step 2: Coffee brewed using ${water}`);
      resolve("fresh coffee");
    }, randomDelay());
  });
}

function pourIntoCup(coffee) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail()) return reject(new Error("Cup slipped and broke"));
      console.log(`Step 3: Poured ${coffee} into the cup`);
      resolve("cup of coffee");
    }, randomDelay());
  });
}

// Chain: each .then() receives the result of the previous step
boilWater()
  .then((water) => brewCoffee(water))
  .then((coffee) => pourIntoCup(coffee))
  .then(() => console.log("Coffee ready for the team!"))
  .catch((error) => console.log("Coffee process failed:", error.message)); // any step failure lands here
