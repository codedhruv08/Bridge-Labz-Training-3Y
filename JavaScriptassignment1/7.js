const secret = Math.floor(Math.random() * 50) + 1; // 1 to 50
const userGuess = 25;                              // test value
 
console.log(`(Secret number: ${secret}, Your guess: ${userGuess})`);
 
if (userGuess === secret) {
  console.log("Correct guess!");
} else {
  // Nested if: first check closeness, then direction
  if (userGuess >= secret - 3 && userGuess <= secret + 3) {
    console.log("Very close!");
  } else if (userGuess > secret) {
    console.log("Too high");
  } else {
    console.log("Too low");
  }
}
 