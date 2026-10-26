// Q7: Login Form Validation using RegExp

const usernamePattern = /^.{5,}$/;      // at least 5 characters
const hasNumber = /\d/;
const hasUppercase = /[A-Z]/;
const hasLowercase = /[a-z]/;
const hasSpecial = /[^A-Za-z0-9]/;
const minLength8 = /^.{8,}$/;

// Return a list of specific error messages (empty list = valid)
function getUsernameErrors(username) {
  const errors = [];
  if (!usernamePattern.test(username)) errors.push("Username must be at least 5 characters.");
  return errors;
}

function getPasswordErrors(password) {
  const errors = [];
  if (!minLength8.test(password)) errors.push("Password must be at least 8 characters.");
  if (!hasNumber.test(password)) errors.push("Password must include a number.");
  if (!hasUppercase.test(password)) errors.push("Password must include an uppercase letter.");
  if (!hasLowercase.test(password)) errors.push("Password must include a lowercase letter.");
  if (!hasSpecial.test(password)) errors.push("Password must include a special character.");
  return errors;
}

// Fill a <ul> with error messages
function showErrors(listId, errors) {
  document.getElementById(listId).innerHTML = errors.map((msg) => `<li>${msg}</li>`).join("");
}

if (typeof document !== "undefined") {
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const usernameErrors = getUsernameErrors(document.getElementById("username").value);
    const passwordErrors = getPasswordErrors(document.getElementById("password").value);

    showErrors("usernameErrors", usernameErrors);
    showErrors("passwordErrors", passwordErrors);

    const isValid = usernameErrors.length === 0 && passwordErrors.length === 0;
    document.getElementById("success").textContent = isValid ? "Login successful!" : "";
  });
}

if (typeof module !== "undefined") module.exports = { getUsernameErrors, getPasswordErrors };
