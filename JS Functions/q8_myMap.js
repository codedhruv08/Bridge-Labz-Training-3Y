// Q8: Custom myMap() on Array.prototype (behaves like map)

Array.prototype.myMap = function (callback) {
  const result = [];
  // `this` is the array on which myMap was called
  for (let i = 0; i < this.length; i++) {
    if (i in this) {                          // skip empty slots like map()
      result[i] = callback(this[i], i, this); // value, index, array (like map)
    }
  }
  return result;                              // original array is not changed
};

console.log([1, 2, 3].myMap((num) => num * 2));            // [2, 4, 6]
console.log([10, 20].myMap((v, i) => v + i));              // [10, 21]
console.log([1, 2, 3].map((num) => num * 2));              // built-in, same result
