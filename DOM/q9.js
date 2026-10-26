// Q9: Form validation. preventDefault() stops the real submit; errors clear as the user fixes input.

const form = document.getElementById("signupForm");
const successMsg = document.getElementById("successMsg");

// Each field: its input, where its error shows, and a rule that returns an error text or ""
const fields = [
  {
    input: document.getElementById("name"),
    error: document.getElementById("nameError"),
    validate: (value) => (value.trim() === "" ? "Name is required." : "")
  },
  {
    input: document.getElementById("email"),
    error: document.getElementById("emailError"),
    validate: (value) => {
      if (value.trim() === "") return "Email is required.";
      if (!value.includes("@")) return "Email must contain @.";
      return "";
    }
  },
  {
    input: document.getElementById("password"),
    error: document.getElementById("passwordError"),
    validate: (value) => (value.length < 6 ? "Password must be at least 6 characters." : "")
  }
];

// Validate one field, show/hide its error, and return true when valid
function checkField(field) {
  const message = field.validate(field.input.value);
  field.error.textContent = message;
  field.input.classList.toggle("invalid", message !== "");
  return message === "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();                       // never let the browser submit/reload
  successMsg.textContent = "";

  // map (not .every) so ALL invalid fields show their errors at once
  const allValid = fields.map(checkField).every(Boolean);

  if (allValid) {
    successMsg.textContent = "Form Submitted Successfully";
    form.reset();
  }
});

// Live correction: once a field has an error, re-check it on every keystroke
fields.forEach((field) => {
  field.input.addEventListener("input", () => {
    if (field.error.textContent !== "") checkField(field);
  });
});
