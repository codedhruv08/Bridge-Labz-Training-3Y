// Q4: Theme switcher. Everything is applied with setAttribute().

const body = document.body;
const status = document.getElementById("status");

function applyTheme(themeName) {
  body.setAttribute("class", `theme-${themeName}`);  // class applied via setAttribute
  body.setAttribute("data-theme", themeName);        // current theme stored in custom attribute
  status.textContent = `Current theme: ${body.getAttribute("data-theme")}`;
}

// One click listener for all three buttons
document.querySelectorAll("[data-theme-choice]").forEach((button) => {
  button.addEventListener("click", () => applyTheme(button.getAttribute("data-theme-choice")));
});

applyTheme("light"); // default theme
