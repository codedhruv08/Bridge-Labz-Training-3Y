// Q5: 6-image gallery; click an image to open a modal with a larger version.

const gallery = document.getElementById("gallery");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");

// Build 6 images (small version for the grid, large version for the modal)
for (let id = 1; id <= 6; id++) {
  const img = document.createElement("img");
  img.src = `https://picsum.photos/id/${id * 10}/300/200`;
  img.dataset.large = `https://picsum.photos/id/${id * 10}/900/600`;
  img.alt = `Gallery image ${id}`;
  gallery.appendChild(img);
}

// Event delegation on the gallery container
gallery.addEventListener("click", (event) => {
  if (event.target.tagName !== "IMG") return;
  modalImage.src = event.target.dataset.large;
  modalImage.alt = event.target.alt;
  overlay.classList.add("open");
});

// Clicking the dark overlay (outside the modal) closes it
overlay.addEventListener("click", () => overlay.classList.remove("open"));

// Clicks inside the modal must NOT bubble up to the overlay
modal.addEventListener("click", (event) => event.stopPropagation());
