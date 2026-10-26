// Q9: Person -> Student using ES6 classes, compared with the prototype version

// ---------- ES6 class version ----------
class PersonClass {
  constructor(name) {
    this.name = name;
  }
  printName() {
    console.log("Name: " + this.name);
  }
}

class StudentClass extends PersonClass {
  constructor(name, branch) {
    super(name);          // calls the parent constructor
    this.branch = branch;
  }
  printBranch() {
    console.log("Branch: " + this.branch);
  }
}

// ---------- Prototype version (from Q5) ----------
function PersonProto(name) {
  this.name = name;
}
PersonProto.prototype.printName = function () {
  console.log("Name: " + this.name);
};
function StudentProto(name, branch) {
  PersonProto.call(this, name);
  this.branch = branch;
}
StudentProto.prototype = Object.create(PersonProto.prototype);
StudentProto.prototype.constructor = StudentProto;
StudentProto.prototype.printBranch = function () {
  console.log("Branch: " + this.branch);
};

// ---------- Compare behaviour ----------
const s1 = new StudentClass("Dhruv", "Computer Science");
const s2 = new StudentProto("Dhruv", "Computer Science");

console.log("Class version:");
s1.printName();
s1.printBranch();

console.log("Prototype version:");
s2.printName();
s2.printBranch();

console.log("Class chain OK  :", s1 instanceof StudentClass, s1 instanceof PersonClass);
console.log("Proto chain OK  :", s2 instanceof StudentProto, s2 instanceof PersonProto);
console.log("Methods on prototype (class)?", typeof StudentClass.prototype.printBranch === "function");
// Classes are "syntactic sugar": underneath they still use prototypes.
console.log(typeof StudentClass); // "function"
