// Q8: Custom dropdown built with button + list. Outside-click uses the CAPTURING phase.

const dropdown = document.getElementById("dropdown");
const dropdownBtn = document.getElementById("dropdownBtn");
const optionList = document.getElementById("optionList");

// Button toggles the list
dropdownBtn.addEventListener("click", () => {
  optionList.classList.toggle("open");
});

// Clicking an option updates the button text and closes the list
optionList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    dropdownBtn.textContent = event.target.textContent;
    optionList.classList.remove("open");
  }
});

// Close on outside click. The third argument `true` = capturing phase, so this
// runs on the way DOWN to the target, before any other click handler.
document.addEventListener(
  "click",
  (event) => {
    if (!dropdown.contains(event.target)) {
      optionList.classList.remove("open");
    }
  },
  true
);
