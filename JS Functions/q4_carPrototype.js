// Q4: Constructor function + shared prototype method

function Car(brand, model) {
  this.brand = brand;   // own property of each object
  this.model = model;
}

// Defined ONCE on the prototype, shared by all Car objects
Car.prototype.getDetails = function () {
  console.log("Brand: " + this.brand + ", Model: " + this.model);
};

const car1 = new Car("Toyota", "Fortuner");
const car2 = new Car("Hyundai", "Creta");

car1.getDetails();
car2.getDetails();

// Proof of method sharing: both objects use the very same function
console.log("Same method shared?", car1.getDetails === car2.getDetails); // true
console.log("Own property on car1?", car1.hasOwnProperty("getDetails")); // false
