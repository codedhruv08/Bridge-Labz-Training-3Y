"use strict"; // Strict mode: any accidental undeclared variable throws instead of silently becoming a global.

// ---------------------------------------------------------------
// Q1 - Dynamic Data Parser
// ---------------------------------------------------------------
const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

// Two result buckets required by the task.
const validNumbers = [];   // clean numeric data
const invalidEntries = []; // anything that cannot be trusted as a number

/**
 * Decide whether a raw API value is a usable number.
 * DEBUG OBSERVATIONS (why a plain Number() check is NOT enough):
 *  - Number(" ")      -> 0   (whitespace-only strings silently become 0!)
 *  - Number(null)     -> 0   (null silently becomes 0!)
 *  - Number(undefined)-> NaN
 *  - Number("true")   -> NaN (the string "true" is not numeric, even though Boolean-ish)
 *  - Number("100px")  -> NaN (any trailing junk makes the whole thing NaN)
 * So we must reject null/undefined/blank BEFORE calling Number().
 */
function checkNumeric(raw) {
  if (raw === null || raw === undefined) {
    return { ok: false, reason: "missing value (null/undefined)" };
  }
  if (typeof raw === "string" && raw.trim() === "") {
    return { ok: false, reason: "blank string (Number(' ') would wrongly give 0)" };
  }
  const n = Number(raw);
  if (!Number.isFinite(n)) {            // catches NaN and +/-Infinity
    return { ok: false, reason: "not a valid number (NaN)" };
  }
  return { ok: true, value: n };
}

console.log("=== Q1: DYNAMIC DATA PARSER REPORT ===\n");

for (let i = 0; i < apiData.length; i++) {
  const raw = apiData[i];

  // Task 1: three conversions for every value.
  const asNumber = Number(raw);
  const asBoolean = Boolean(raw); // NOTE: Boolean("false") is TRUE - any non-empty string is truthy!
  const asString = String(raw);   // String(null) -> "null", String(undefined) -> "undefined"

  // Task 2: validate numerics, skip the bad ones.
  const result = checkNumeric(raw);

  // Task 4: conditional formatting using ternary + padEnd for aligned columns.
  const status = result.ok ? "VALID  " : "INVALID";
  const marker = result.ok ? "[+]" : "[x]";
  console.log(
    `${marker} #${i} raw=${String(JSON.stringify(raw)).padEnd(8)} | ` +
    `Number=${String(asNumber).padEnd(4)} | Boolean=${String(asBoolean).padEnd(5)} | ` +
    `String="${asString}" | ${status}`
  );

  // Task 3: route into the right array.
  if (result.ok) {
    validNumbers.push(result.value);
  } else {
    invalidEntries.push({ index: i, raw: raw, reason: result.reason });
    // Task 2: invalid values are logged separately.
    console.log(`    -> skipped: ${result.reason}`);
  }
}

console.log("\n--- Valid numeric data ---");
console.log(validNumbers);
console.log("\n--- Invalid entries ---");
for (const item of invalidEntries) {
  console.log(`  index ${item.index}: ${JSON.stringify(item.raw)} (${item.reason})`);
}
console.log(`\nSummary: ${validNumbers.length} valid, ${invalidEntries.length} invalid, ${apiData.length} total`);
console.log(`Sum of valid numbers: ${validNumbers.reduce((a, b) => a + b, 0)}`);
