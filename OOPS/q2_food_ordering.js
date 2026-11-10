// Q2. Online Food Ordering (map + reduce + Error Handling)
const menu = [
  { item: "Burger", price: 120 },
  { item: "Pizza", price: 250 },
  { item: "Pasta", price: 180 },
  { item: "Fries", price: 90 },
  { item: "Coke", price: 50 },
];

function calculateBill(orderItems) {
  // map(): convert each ordered item name into its price
  const prices = orderItems.map((name) => {
    const found = menu.find((m) => m.item.toLowerCase() === name.toLowerCase());
    if (!found) throw new Error(`Invalid item ordered: "${name}" is not on the menu`);
    return found.price;
  });

  // reduce(): sum all prices
  return prices.reduce((total, price) => total + price, 0);
}

// Test 1: valid order
try {
  console.log("Bill:", calculateBill(["Burger", "Fries", "Coke"]));
} catch (err) {
  console.log("Error:", err.message);
}

// Test 2: invalid order
try {
  console.log("Bill:", calculateBill(["Pizza", "Sushi"]));
} catch (err) {
  console.log("Error:", err.message);
}
