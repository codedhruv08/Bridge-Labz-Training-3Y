// Q2: Character counter (max 100) with yellow warning at 20 left and red + typing block at 0.

const MAX_CHARS = 100;
const WARNING_AT = 20;

const textBox = document.getElementById("textBox");
const counter = document.getElementById("counter");
const resetBtn = document.getElementById("resetBtn");

// Update the number and the colour class
function updateCounter() {
  const remaining = MAX_CHARS - textBox.value.length;
  counter.textContent = `${remaining} characters remaining`;
  counter.classList.toggle("warning", remaining <= WARNING_AT && remaining > 0);
  counter.classList.toggle("danger", remaining <= 0);
}

// Block typing once the limit is reached (deleting / navigating is still allowed)
textBox.addEventListener("keydown", (event) => {
  const limitReached = textBox.value.length >= MAX_CHARS;
  const isTypingKey = event.key.length === 1 || event.key === "Enter"; // printable chars
  const isShortcut = event.ctrlKey || event.metaKey;                   // Ctrl+A, Ctrl+C...
  const hasSelection = textBox.selectionStart !== textBox.selectionEnd; // replacing selected text is fine

  if (limitReached && isTypingKey && !isShortcut && !hasSelection) {
    event.preventDefault();
  }
});

// Safety net: pasted text is trimmed to the limit
textBox.addEventListener("input", () => {
  if (textBox.value.length > MAX_CHARS) {
    textBox.value = textBox.value.slice(0, MAX_CHARS);
  }
  updateCounter();
});

resetBtn.addEventListener("click", () => {
  textBox.value = "";
  updateCounter();
  textBox.focus();
});

updateCounter();
