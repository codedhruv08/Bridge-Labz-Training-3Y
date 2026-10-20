"use strict";

// ---------------------------------------------------------------
// Q8 - Strict Mode Showdown
// The original function can NOT live in a strict file at all: duplicate parameter names are an
// early SyntaxError, so the whole file would refuse to load. To compare both modes in one file
// we build the code from strings with new Function (its body is sloppy unless it says "use strict").
// ---------------------------------------------------------------

function run(label, source) {
  try {
    const result = new Function(source)();
    console.log(`  [OK]    ${label} ->`, result);
  } catch (e) {
    console.log(`  [ERROR] ${label} -> ${e.name}: ${e.message}`);
  }
}

const original = `function demo(a, a) { total = 10; delete total; } return demo(5, 10);`;

console.log("=== Q8: STRICT MODE SHOWDOWN ===");

console.log("\n1) Original code WITHOUT 'use strict' (sloppy mode):");
run("original (sloppy)", original);
// Sloppy: duplicate params allowed (last one wins, a = 10), total = 10 creates an implicit global,
// and delete on it silently succeeds. The function just returns undefined.
run("sloppy details ", `function demo(a, a) { total = 10; var r = delete total; return { a: a, deleted: r, totalAfter: typeof total }; } return demo(5, 10);`);

console.log("\n   Original code WITH 'use strict':");
run("original (strict)", `"use strict"; ${original}`);

console.log("\n2) Each violation on its own in strict mode:");
run("duplicate parameter", `"use strict"; function f(a, a) {} return f(1, 2);`);
run("undeclared assignment", `"use strict"; function f() { total = 10; } return f();`);
run("delete identifier", `"use strict"; function f() { var t = 1; delete t; } return f();`);

// 3) WHY strict mode forbids these:
//  - Duplicate parameters: ambiguous - which `a` is meant? Almost always a typo, and the first value is lost.
//  - Undeclared assignment: typos like `totl = 10` would silently create globals and pollute the global scope.
//  - delete on a plain variable: variables are bindings, not object properties; deleting them makes no sense
//    and breaks optimisation. Only properties (delete obj.key) can be deleted.

// 4) Correct ES6 version
console.log("\n3) Correct ES6 version:");
function demo(a, b) {                      // unique parameter names
  let total = 10;                          // declared; block scoped
  total += a + b;
  const record = { total };                // delete is legal on object PROPERTIES
  delete record.total;
  return { a, b, total, recordAfterDelete: record };
}
console.log("  ", demo(5, 10));

// Arrow / default-parameter forms also reject duplicates, even in sloppy mode:
run("arrow duplicate params (always illegal)", `return ((a, a) => a)(1, 2);`);
