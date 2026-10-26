// Q6: Filter table rows live while typing (case-insensitive).

const searchBox = document.getElementById("searchBox");
const rows = document.querySelectorAll("#studentBody tr");
const noResults = document.getElementById("noResults");

searchBox.addEventListener("input", () => {
  const query = searchBox.value.trim().toLowerCase();
  let visibleCount = 0;

  rows.forEach((row) => {
    const rowText = row.textContent.toLowerCase();
    const matches = rowText.includes(query);   // empty query matches every row
    row.style.display = matches ? "" : "none";
    if (matches) visibleCount++;
  });

  noResults.style.display = visibleCount === 0 ? "block" : "none";
});
