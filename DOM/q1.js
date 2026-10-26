// Q1: Product list with Add / Edit / Delete using event delegation on the parent <ul>.

const productInput = document.getElementById("productInput");
const addBtn = document.getElementById("addBtn");
const productList = document.getElementById("productList");

// Keeps track of the <li> that is currently being edited (or null)
let currentlyEditingItem = null;

// Build one <li> for a product name
function createProductItem(productName) {
  const item = document.createElement("li");
  item.innerHTML = `
    <span class="name"></span>
    <button data-action="edit">Edit</button>
    <button data-action="delete">Delete</button>`;
  item.querySelector(".name").textContent = productName; // textContent avoids HTML injection
  return item;
}

// Add a new product
function addProduct() {
  const productName = productInput.value.trim();
  if (productName === "") return;          // ignore empty input
  productList.appendChild(createProductItem(productName));
  productInput.value = "";
  productInput.focus();
}

addBtn.addEventListener("click", addProduct);
productInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addProduct();
});

// Switch an item into inline-edit mode (replace text with an input)
function startEditing(item) {
  saveEditing();                            // only one item can be edited at a time
  const nameSpan = item.querySelector(".name");
  const editor = document.createElement("input");
  editor.value = nameSpan.textContent;
  editor.className = "name";
  nameSpan.replaceWith(editor);
  item.classList.add("editing");
  item.querySelector('[data-action="edit"]').textContent = "Save";
  editor.focus();
  currentlyEditingItem = item;
}

// Save the item being edited (if any) and go back to normal mode
function saveEditing() {
  if (!currentlyEditingItem) return;
  const editor = currentlyEditingItem.querySelector("input.name");
  const newName = editor.value.trim();
  const nameSpan = document.createElement("span");
  nameSpan.className = "name";
  nameSpan.textContent = newName || editor.defaultValue; // keep old name if emptied
  editor.replaceWith(nameSpan);
  currentlyEditingItem.classList.remove("editing");
  currentlyEditingItem.querySelector('[data-action="edit"]').textContent = "Edit";
  currentlyEditingItem = null;
}

// EVENT DELEGATION: a single listener on <ul> handles every Edit/Delete button
productList.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action) return;
  const item = event.target.closest("li");

  if (action === "delete") {
    if (item === currentlyEditingItem) currentlyEditingItem = null;
    item.remove();
  } else if (action === "edit") {
    if (item === currentlyEditingItem) saveEditing(); // button reads "Save" while editing
    else startEditing(item);
  }
});

// Auto-save when the user clicks anywhere outside the item being edited
document.addEventListener("click", (event) => {
  if (currentlyEditingItem && !currentlyEditingItem.contains(event.target)) {
    saveEditing();
  }
});
