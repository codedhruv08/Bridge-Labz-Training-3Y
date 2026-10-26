// Q3: 3-step form. "Next" only works when the current step is valid.

const steps = document.querySelectorAll(".step");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const errorMsg = document.getElementById("errorMsg");
const progress = document.getElementById("progress");
const formArea = document.getElementById("formArea");
const summary = document.getElementById("summary");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

let currentStep = 0;

// One validator per step; returns an error message or "" when valid
const validators = [
  () => (nameInput.value.trim().length >= 2 ? "" : "Please enter your name (min 2 characters)."),
  () => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()) ? "" : "Please enter a valid email."),
  () => (passwordInput.value.length >= 6 ? "" : "Password must be at least 6 characters.")
];

// Show only the current step
function showStep() {
  steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
  progress.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  backBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === steps.length - 1 ? "Finish" : "Next";
  errorMsg.textContent = "";
}

nextBtn.addEventListener("click", () => {
  const error = validators[currentStep]();
  if (error) {                       // invalid -> stay on this step
    errorMsg.textContent = error;
    return;
  }
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep();
  } else {
    showSummary();                   // all 3 steps done
  }
});

backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
});

function showSummary() {
  formArea.hidden = true;
  progress.hidden = true;
  summary.hidden = false;
  summary.innerHTML = `<h2>Summary</h2>
    <p><b>Name:</b> <span id="sName"></span></p>
    <p><b>Email:</b> <span id="sEmail"></span></p>
    <p><b>Password:</b> ${"*".repeat(passwordInput.value.length)}</p>`;
  document.getElementById("sName").textContent = nameInput.value.trim();
  document.getElementById("sEmail").textContent = emailInput.value.trim();
}

showStep();
