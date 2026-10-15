// Q8. Dynamic Discount Evaluator

const cart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes", category: "fashion", price: 2500 },
  { item: "Book", category: "education", price: 600 }
];

function calculateFinalTotal(cartItems) {
  // Original cart value (before any discount)
  const originalTotal = cartItems.reduce((sum, product) => sum + product.price, 0);

  // Apply category-based discounts using a loop
  let discountedTotal = 0;
  for (const product of cartItems) {
    let discountRate = 0;
    if (product.category === "electronics") {
      discountRate = 0.10;      // 10% off
    } else if (product.category === "fashion") {
      discountRate = 0.05;      // 5% off
    }
    const finalPrice = product.price - product.price * discountRate;
    console.log(`${product.item}: ${product.price} -> ${finalPrice} (${discountRate * 100}% off)`);
    discountedTotal += finalPrice;
  }

  // Extra 5% overall discount if original cart value > 50000
  if (originalTotal > 50000) {
    discountedTotal = discountedTotal * 0.95;
    console.log("Extra 5% overall discount applied (cart > 50000)");
  } else {
    console.log("No extra discount (cart <= 50000)");
  }

  console.log("Original total:", originalTotal);
  console.log("Final total   :", discountedTotal);
  return discountedTotal;
}

console.log("--- Given cart ---");
calculateFinalTotal(cart);

// Second test: bigger cart that triggers the extra discount
console.log("\n--- Larger cart (test) ---");
calculateFinalTotal([...cart, { item: "Phone", category: "electronics", price: 20000 }]);
