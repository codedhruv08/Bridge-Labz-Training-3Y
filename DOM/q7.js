// Q7: Live mouse coordinates inside a 400x400 box; double-click drops a red dot.

const box = document.getElementById("box");
const coords = document.getElementById("coords");

// Live clientX / clientY while the mouse moves inside the box
box.addEventListener("mousemove", (event) => {
  coords.textContent = `clientX: ${event.clientX}, clientY: ${event.clientY}`;
});

box.addEventListener("mouseleave", () => {
  coords.textContent = "clientX: -, clientY: -";
});

// Double-click: place a dot exactly where the click happened
box.addEventListener("dblclick", (event) => {
  const boxRect = box.getBoundingClientRect();           // box position on screen
  const dot = document.createElement("div");
  dot.className = "dot";
  // client coords -> coords relative to the box (minus 2px border)
  dot.style.left = `${event.clientX - boxRect.left - box.clientLeft}px`;
  dot.style.top = `${event.clientY - boxRect.top - box.clientTop}px`;
  box.appendChild(dot);
});
