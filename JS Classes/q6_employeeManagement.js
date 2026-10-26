// Q6: Employee Management System (Classes + Object Methods)

class Employee {
  constructor(id, name, department, salary) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.salary = salary;   // monthly salary
  }

  // Annual salary = monthly salary x 12
  getAnnualSalary() {
    return this.salary * 12;
  }

  // Increase monthly salary by the given percentage
  applyBonus(percent) {
    this.salary += (this.salary * percent) / 100;
  }
}

const employees = [
  new Employee(1, "Amit", "Engineering", 60000),
  new Employee(2, "Neha", "HR", 45000),
  new Employee(3, "Rohan", "Sales", 40000),
  new Employee(4, "Priya", "Engineering", 70000),
  new Employee(5, "Karan", "Finance", 50000),
];

console.log("Annual salaries:");
employees.forEach((emp) => {
  console.log(`${emp.name} (${emp.department}): Rs. ${emp.getAnnualSalary()}`);
});

// reduce(): add up everyone's annual salary
const totalAnnualPayout = employees.reduce((total, emp) => total + emp.getAnnualSalary(), 0);
console.log(`\nTotal annual payout: Rs. ${totalAnnualPayout}`);

// Bonus demo
employees[1].applyBonus(10);
console.log(`\nNeha after 10% bonus -> annual: Rs. ${employees[1].getAnnualSalary()}`);
const newTotal = employees.reduce((total, emp) => total + emp.getAnnualSalary(), 0);
console.log(`New total annual payout: Rs. ${newTotal}`);
