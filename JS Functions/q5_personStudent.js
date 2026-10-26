// Q5: Person -> Student inheritance with prototypes

function Person(name) {
  this.name = name;
}
Person.prototype.printName = function () {
  console.log("Name: " + this.name);
};

function Student(name, branch) {
  Person.call(this, name);   // reuse Person constructor to set `name`
  this.branch = branch;
}

// Link prototype chain: Student.prototype -> Person.prototype
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student; // restore constructor reference

Student.prototype.printBranch = function () {
  console.log("Branch: " + this.branch);
};

const student = new Student("Dhruv", "Computer Science");
student.printName();    // found on Person.prototype
student.printBranch();  // found on Student.prototype

// Prototype chain demonstration
console.log(Object.getPrototypeOf(student) === Student.prototype);                 // true
console.log(Object.getPrototypeOf(Student.prototype) === Person.prototype);       // true
console.log(student instanceof Student, student instanceof Person);                // true true
// Chain: student -> Student.prototype -> Person.prototype -> Object.prototype -> null
