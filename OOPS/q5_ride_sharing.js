// Q5. Ride-Sharing Application
class User {
  constructor(name, rating) {
    this.name = name;
    this.rating = rating;
  }
}

class Driver extends User {
  constructor(name, rating, vehicle) {
    super(name, rating);
    this.vehicle = vehicle; // e.g. { model, number }
  }
}

class Trip {
  constructor(fromLocation, toLocation, distance) {
    this.fromLocation = fromLocation;
    this.toLocation = toLocation;
    this.distance = distance;
  }

  calculateFare() {
    if (this.distance === undefined || this.distance === null) {
      throw new Error("Distance is not provided");
    }
    if (this.distance < 0) {
      throw new Error("Distance cannot be negative");
    }
    const baseFare = 50;
    const perKm = 12;
    return baseFare + this.distance * perKm;
  }
}

const rider = new User("Dhruv", 4.8);
const driver = new Driver("Suresh", 4.6, { model: "Swift Dzire", number: "UP80 AB 1234" });
console.log(`Rider: ${rider.name} (${rider.rating}) | Driver: ${driver.name} (${driver.rating}), ${driver.vehicle.model} ${driver.vehicle.number}`);

const trips = [
  new Trip("Aligarh", "Agra", 80),
  new Trip("Aligarh", "Delhi", -5),
  new Trip("Aligarh", "Mathura"), // distance missing
];

trips.forEach((trip) => {
  try {
    console.log(`${trip.fromLocation} -> ${trip.toLocation}: Fare = Rs. ${trip.calculateFare()}`);
  } catch (err) {
    console.log(`Trip ${trip.fromLocation} -> ${trip.toLocation} failed: ${err.message}`);
  }
});
