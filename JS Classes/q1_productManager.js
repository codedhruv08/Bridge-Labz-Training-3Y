// Q1: E-Commerce Product Manager (Classes + Objects)

class Product {
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }

  // Reduce price by the given percentage (e.g. 10 => 10% off)
  applyDiscount(percent) {
    this.price = this.price - (this.price * percent) / 100;
  }

  // Return a formatted string with all product details
  getDetails() {
    return `#${this.id} | ${this.name} | ${this.category} | Rs. ${this.price.toFixed(2)}`;
  }
}

// Array of product objects
const products = [
  new Product(1, "Laptop", 55000, "Electronics"),
  new Product(2, "Mouse", 599, "Accessories"),
  new Product(3, "Headphones", 2499, "Electronics"),
  new Product(4, "Notebook", 120, "Stationery"),
  new Product(5, "Monitor", 12000, "Electronics"),
];

console.log("All products:");
products.forEach((product) => console.log(product.getDetails()));

// Apply 10% discount on the first product
products[0].applyDiscount(10);
console.log("\nAfter 10% discount on Laptop:");
console.log(products[0].getDetails());

// filter(): products with price greater than 1000
const expensiveProducts = products.filter((product) => product.price > 1000);
console.log("\nProducts with price > 1000:");
expensiveProducts.forEach((product) => console.log(product.getDetails()));
