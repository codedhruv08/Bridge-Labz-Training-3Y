// Q3: Arrow function vs normal function and `this`

// Arrow function version (problem)
const user = {
  name: "Dhruv",
  showName: () => {
    console.log("Arrow  ->", this.name);
  },
};
user.showName(); // undefined

/*
 WHY undefined?
 Arrow functions do NOT have their own `this`. They take `this` from the
 surrounding (lexical) scope where they were written. Here that scope is
 the top level of the file, NOT the `user` object (object literals do not
 create a scope). In Node.js, top-level `this` is module.exports ({}), so
 this.name is undefined. In a browser it is `window`, and window.name is
 not "Dhruv" either.
*/

// Fix: normal function (method) gets `this` from the object calling it
const fixedUser = {
  name: "Dhruv",
  showName: function () {
    console.log("Normal ->", this.name);
  },
};
fixedUser.showName(); // Dhruv  (called as fixedUser.showName(), so this = fixedUser)
