// Q7. Banking Application (private fields)
class BankAccount {
  #balance;

  constructor(initialBalance = 0) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit amount must be greater than 0");
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error("Withdrawal amount must be greater than 0");
    if (amount > this.#balance) throw new Error("Insufficient balance");
    this.#balance -= amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(1000);
console.log("Initial balance:", account.getBalance());

// Valid deposits
account.deposit(500);
console.log("After depositing 500:", account.getBalance());
account.deposit(250);
console.log("After depositing 250:", account.getBalance());

// Valid withdrawal
account.withdraw(300);
console.log("After withdrawing 300:", account.getBalance());

// Invalid withdrawal (insufficient balance)
try {
  account.withdraw(5000);
} catch (err) {
  console.log("Error:", err.message);
}

// Invalid deposit
try {
  account.deposit(-100);
} catch (err) {
  console.log("Error:", err.message);
}

// Private field cannot be accessed directly
console.log("Direct access:", account.balance); // undefined
console.log("Final balance:", account.getBalance());
