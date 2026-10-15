// Q4. Array Performance Analyzer

// Create an array of 8 random scores between 30 and 100
const scores = Array.from({ length: 8 }, () => Math.floor(Math.random() * 71) + 30);

// Highest and lowest scores
const highest = Math.max(...scores);
const lowest = Math.min(...scores);

// Average score using reduce()
const total = scores.reduce((sum, score) => sum + score, 0);
const average = total / scores.length;

// Students who passed (score >= 50) using filter()
const passedScores = scores.filter(score => score >= 50);

// Pass/Fail label for each student using map()
const results = scores.map((score, index) =>
  `Student ${index + 1}: ${score} (${score >= 50 ? "Pass" : "Fail"})`
);

// Display summary
console.log("===== Performance Summary =====");
console.log("Scores         :", scores.join(", "));
results.forEach(line => console.log(line));
console.log("Highest score  :", highest);
console.log("Lowest score   :", lowest);
console.log("Average score  :", average.toFixed(2));
console.log("Students passed:", passedScores.length, "out of", scores.length);
