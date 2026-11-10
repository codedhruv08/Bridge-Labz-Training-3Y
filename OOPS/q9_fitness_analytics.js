// Q9. Fitness App Analytics
class FitnessAnalytics {
  constructor(data) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Dataset is empty");
    }
    this.data = data;
  }

  getActiveUsers() {
    return this.data.filter((u) => u.steps > 7000);
  }

  getAverageCalories() {
    const total = this.data.reduce((sum, u) => sum + u.calories, 0);
    return total / this.data.length;
  }

  getUserSummary() {
    return this.data.map((u) => `User ${u.user} walked ${u.steps} steps and burned ${u.calories} calories.`);
  }
}

const workoutData = [
  { user: "A", steps: 8000, calories: 300 },
  { user: "B", steps: 12000, calories: 500 },
  { user: "C", steps: 4000, calories: 200 },
];

const analytics = new FitnessAnalytics(workoutData);
console.log("Active users:", analytics.getActiveUsers().map((u) => u.user));
console.log("Average calories:", analytics.getAverageCalories().toFixed(2));
console.log("Summary:");
analytics.getUserSummary().forEach((msg) => console.log(" -", msg));

// Empty dataset error
try {
  new FitnessAnalytics([]);
} catch (err) {
  console.log("Error:", err.message);
}
