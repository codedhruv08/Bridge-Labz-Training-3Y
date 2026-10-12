const userName = "Riya";                          // string
const age = 24;                                   // number
const isActive = true;                            // boolean
const hobbies = ["reading", "coding", "music"];   // array
const address = { city: "Mathura", pin: 281001 }; // object
const middleName = null;                          // null
let phone;                                        // undefined
 
// Helper: typeof gives "object" for arrays and null, so handle them specially
function getType(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}
 
// Build the report as an array of rows, then print with ONE console.table()
const entries = [
  ["userName", userName],
  ["age", age],
  ["isActive", isActive],
  ["hobbies", hobbies],
  ["address", address],
  ["middleName", middleName],
  ["phone", phone],
];
const report = entries.map(([label, value]) => ({
  Label: label,
  Value: JSON.stringify(value) === undefined ? "undefined" : JSON.stringify(value),
  Type: getType(value),
}));
console.table(report);