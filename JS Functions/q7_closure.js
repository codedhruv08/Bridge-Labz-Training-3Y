// Q7: Closure with makeMultiplier

function makeMultiplier(multiplier) {
  // The returned inner function "remembers" `multiplier`
  return function (number) {
    return number * multiplier;
  };
}

const double = makeMultiplier(2);
const triple = makeMultiplier(3);

console.log(triple(5)); // 15
console.log(double(5)); // 10

/*
 HOW CLOSURE WORKS:
 When makeMultiplier(3) finishes, its local variable `multiplier` would
 normally be destroyed. But the inner function still references it, so
 JavaScript keeps that variable alive in a closure. `triple` therefore
 carries its own private multiplier = 3, and `double` carries
 multiplier = 2. Each call to makeMultiplier creates a separate closure.
*/
