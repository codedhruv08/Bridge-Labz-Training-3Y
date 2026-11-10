// Q4. Employee Inheritance + Runtime Polymorphism
class Employee {
  constructor(name, department) {
    this.name = name;
    this.department = department;
  }

  work() {
    return `${this.name} from ${this.department} is doing assigned tasks.`;
  }
}

class Manager extends Employee {
  work() {
    return `${this.name} from ${this.department} is managing the team and planning projects.`;
  }
}

const emp = new Employee("Rahul", "Engineering");
const mgr = new Manager("Sneha", "Engineering");

console.log(emp.work());
console.log(mgr.work());

// Runtime polymorphism: same method call, behavior decided by actual object type
const staff = [emp, mgr, new Manager("Karan", "Sales"), new Employee("Pooja", "HR")];
staff.forEach((person) => console.log(person.work()));
