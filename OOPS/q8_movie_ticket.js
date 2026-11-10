// Q8. Movie Ticket Booking System
class MovieTicket {
  constructor(movieName, seatNo, price) {
    this.movieName = movieName;
    this.seatNo = seatNo;
    this.price = price;
  }
}

class OnlineTicket extends MovieTicket {
  constructor(movieName, seatNo, price, convenienceFee) {
    super(movieName, seatNo, price);
    this.convenienceFee = convenienceFee;
  }

  getTotalAmount() {
    return this.price + this.convenienceFee;
  }
}

// Added to MovieTicket.prototype after the classes are defined
MovieTicket.prototype.printTicket = function () {
  console.log(`Movie: ${this.movieName} | Seat: ${this.seatNo} | Price: Rs. ${this.price}`);
};

const t1 = new OnlineTicket("Interstellar", "A12", 300, 30);
const t2 = new OnlineTicket("Inception", "B07", 250, 25);

// OnlineTicket objects can call printTicket() through the prototype chain
t1.printTicket();
t2.printTicket();
console.log("Total (t1):", t1.getTotalAmount());
console.log("Total (t2):", t2.getTotalAmount());

// Prototype chain demonstration
console.log("t1 own property 'printTicket'?", t1.hasOwnProperty("printTicket")); // false
console.log("OnlineTicket.prototype has it?", OnlineTicket.prototype.hasOwnProperty("printTicket")); // false
console.log("MovieTicket.prototype has it?", MovieTicket.prototype.hasOwnProperty("printTicket")); // true
console.log("Chain OK:", Object.getPrototypeOf(OnlineTicket.prototype) === MovieTicket.prototype);
