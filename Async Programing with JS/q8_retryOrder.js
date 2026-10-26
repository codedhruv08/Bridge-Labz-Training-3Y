// Q8: Order Processing Flow - Async Retry Mechanism

// Returns a Promise that fails 50% of the time
function submitOrder() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("Order submitted");
      } else {
        reject(new Error("Server error"));
      }
    }, 500);
  });
}

// Tries up to 3 times using a loop + await
async function processOrder() {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await submitOrder();                         // pauses here until the Promise settles
      console.log(`Attempt ${attempt}: Success`);
      return "Order processed";                    // success: stop retrying
    } catch (error) {
      console.log(`Attempt ${attempt}: Failed`);   // failure: loop continues
    }
  }

  throw new Error("Order could not be processed"); // all attempts failed
}

// Handle the final failure gracefully
async function main() {
  try {
    const result = await processOrder();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

main();
