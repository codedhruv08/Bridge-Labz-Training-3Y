// Q2: Student Form Validator (Forms + RegExp)

// Regular expressions for each field
const namePattern = /^[A-Za-z]+( [A-Za-z]+)*$/;                          // alphabets only (spaces between words allowed)
const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;                  // example@domain.com
const phonePattern = /^\d{10}$/;                                         // exactly 10 digits
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;     // 1 uppercase, 1 number, 1 special char

// Each rule: field id, pattern, error message
const rules = [
  { id: "name", pattern: namePattern, message: "Name must contain only alphabets." },
  { id: "email", pattern: emailPattern, message: "Enter a valid email (example@domain.com)." },
  { id: "phone", pattern: phonePattern, message: "Phone must be exactly 10 digits." },
  { id: "password", pattern: passwordPattern, message: "Password needs 1 uppercase, 1 number and 1 special character." },
];

// Show green/red border and message for one field; returns true if valid
function validateField(rule) {
  const input = document.getElementById(rule.id);
  const errorBox = document.getElementById(rule.id + "Error");
  const isValid = rule.pattern.test(input.value.trim());

  input.classList.toggle("valid", isValid);
  input.classList.toggle("invalid", !isValid);
  errorBox.textContent = isValid ? "" : rule.message;
  return isValid;
}

if (typeof document !== "undefined") {
  const form = document.getElementById("studentForm");

  // Live validation while typing
  rules.forEach((rule) => {
    document.getElementById(rule.id).addEventListener("input", () => validateField(rule));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();                                   // stop page reload
    const allValid = rules.map(validateField).every(Boolean); // validate every field
    document.getElementById("result").textContent = allValid ? "Registration successful!" : "";
  });
}

if (typeof module !== "undefined") module.exports = { namePattern, emailPattern, phonePattern, passwordPattern };
