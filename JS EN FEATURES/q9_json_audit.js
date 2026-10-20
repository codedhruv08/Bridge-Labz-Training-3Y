"use strict";

// ---------------------------------------------------------------
// Q9 - JSON Audit
// ---------------------------------------------------------------
const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}'
];
const REQUIRED_KEYS = ["user", "age"];

class MissingKeyError extends Error {
  constructor(keys) { super(`Missing key(s): ${keys.join(", ")}`); this.name = "MissingKeyError"; }
}

function audit(list, label) {
  const cleanData = [];
  const errorLog = [];
  console.log(`\n=== ${label} ===`);

  for (let i = 0; i < list.length; i++) {
    const lineNo = i + 1; // human friendly line numbers start at 1

    // DEBUG: breakpoint here. Step with F10/F11 and watch lineNo, cleanData.length, errorLog.length.
    // Control flow on error: try block stops at the throwing line -> jumps to catch -> then finally -> next iteration.
    try {
      const parsed = JSON.parse(list[i]);               // throws SyntaxError on invalid JSON
      if (parsed === null || typeof parsed !== "object") throw new MissingKeyError(REQUIRED_KEYS);
      const missing = REQUIRED_KEYS.filter(k => !(k in parsed));
      if (missing.length > 0) throw new MissingKeyError(missing);
      cleanData.push(parsed);                           // only reached when everything above passed
      console.log(`  line ${lineNo}: OK`);
    } catch (err) {
      const type = err instanceof SyntaxError ? "InvalidJSON" : err.name;
      errorLog.push({ line: lineNo, type, message: err.message });
      console.log(`  line ${lineNo}: ERROR (${type}) ${err.message}`);
    } finally {
      // Runs on success AND failure - useful to see the control flow in the debugger.
    }
  }
  return { cleanData, errorLog };
}

const { cleanData, errorLog } = audit(rawData, "Q9: JSON AUDIT");
console.log("\nClean entries:", cleanData);
console.log("Errors with line numbers:");
errorLog.forEach(e => console.log(`  line ${e.line} | ${e.type} | ${e.message}`));

// Bonus: convert age to Number and keep only adults (18+).
function adultsOnly(users) {
  return users
    .map(u => ({ ...u, age: Number(u.age) }))                 // "22" -> 22
    .filter(u => !Number.isNaN(u.age) && u.age >= 18);        // drops under-18 and non-numeric ages
}
console.log("\nBonus - adults (age >= 18):", adultsOnly(cleanData));

// Extra data so the under-18 filter visibly does something.
const extra = audit(['{"user":"Kid","age":"15"}', '{"user":"Zed","age":"abc"}', '{"user":"Lia","age":30}'], "Bonus demo data");
console.log("\nBonus demo - adults only:", adultsOnly(extra.cleanData));
