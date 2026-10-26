// Q9: Shopping Cart Total (Classes + RegExp for Coupon)

class Cart {
  constructor() {
    this.items = [];            // each item: { name, price, quantity }
    this.discountPercent = 0;   // set when a valid coupon is applied
  }

  addItem(name, price, quantity) {
    this.items.push({ name, price, quantity });
  }

  // Total before discount
  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Coupon must be SAVE or DISC followed by 2 digits (e.g. SAVE20, DISC10)
  applyCoupon(code) {
    const couponPattern = /^(SAVE|DISC)(\d{2})$/;
    const match = couponPattern.exec(code.trim().toUpperCase());

    if (!match) {
      console.log(`Invalid coupon "${code}". Use format like SAVE20 or DISC10.`);
      return false;
    }
    this.discountPercent = Number(match[2]);   // the digits are the discount %
    console.log(`Coupon ${match[0]} applied: ${this.discountPercent}% off.`);
    return true;
  }

  // Total after discount
  getFinalTotal() {
    const total = this.getTotal();
    return total - (total * this.discountPercent) / 100;
  }
}

const cart = new Cart();
cart.addItem("Keyboard", 1500, 1);
cart.addItem("Mouse", 500, 2);
cart.addItem("USB Cable", 200, 3);

console.log("Total:", cart.getTotal());          // 3100

cart.applyCoupon("HELLO");                       // invalid
console.log("Final (no discount):", cart.getFinalTotal());

cart.applyCoupon("SAVE20");                      // valid -> 20% off
console.log("Final total:", cart.getFinalTotal()); // 2480

cart.applyCoupon("DISC10");                      // valid -> 10% off
console.log("Final total:", cart.getFinalTotal()); // 2790
